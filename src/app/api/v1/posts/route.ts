import { NotFoundError, UnAuthorizedError } from "@lib/api/appErrors";
import asyncHandler from "@lib/api/asyncHandler";
import connectDB from "@lib/api/connectDB";
import { getSession } from "@lib/api/nextAuth";
import { PostPayload, postPayloadValidator } from "@lib/validators/post";
import Community from "@models/community";
import Post from "@models/post";
import { StatusCodes } from "http-status-codes";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Create post
export const POST = asyncHandler(async (req: NextRequest) => {
  await connectDB();

  // Did user sign in ?
  const session: Session | null = await getSession();

  if (!session?.user) {
    throw new UnAuthorizedError("You must sign in first");
  }

  // Validate on body
  const payload: PostPayload = await req.json();
  const { title, content, community } = postPayloadValidator.parse(payload);

  // Does community exist?
  const searchedCommunity = await Community.findById(
    new ObjectId(community)
  ).populate("subscriptions");

  if (!searchedCommunity) {
    throw new NotFoundError("Community does not exist");
  }

  // Is user a member of the community
  const isMember = searchedCommunity?.subscriptions.find(
    (item: any) => item.user.toString() === session?.user?._id
  );

  if (!isMember) {
    throw new UnAuthorizedError("User is not a member of the community");
  }

  // Start creation
  let createdPost = await Post.create({
    ...payload,
    author: session?.user?._id,
  });

  createdPost = await createdPost.populate("community");

  return NextResponse.json(
    { post: createdPost },
    { status: StatusCodes.CREATED }
  );
});

// Get all posts
export const GET = asyncHandler(async (req: NextRequest) => {
  // Get queries
  const { searchParams } = new URL(req.url);

  const community = searchParams.get("community");
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;
  const skip = (page - 1) * limit;

  // Start searching
  const searchedPosts: PostResponse[] = await Post.find({ community })
    .skip(skip)
    .limit(limit)
    .populate("author")
    .populate("community");

  return NextResponse.json(
    { posts: searchedPosts },
    { status: StatusCodes.OK }
  );
});

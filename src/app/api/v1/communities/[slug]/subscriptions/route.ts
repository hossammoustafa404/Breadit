import {
  ConflictError,
  NoContentError,
  UnAuthorizedError,
} from "@lib/api/appErrors";
import asyncHandler from "@lib/api/asyncHandler";
import connectDB from "@lib/api/connectDB";
import { getSession } from "@lib/api/nextAuth";
import Community from "@models/community";
import Subreddit from "@models/community";
import Subscription from "@models/subscription";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

// Create subscription
export const POST = asyncHandler(
  async (
    req: NextRequest,
    { params: { slug } }: { params: { slug: string } }
  ) => {
    await connectDB();

    // Is sign in?
    const session: any = await getSession();

    if (!session?.user) {
      throw new UnAuthorizedError("You must sign in first");
    }

    // Validate slug
    const searchedCommunity: CommunityResponse | null = await Community.findOne(
      { title: slug }
    )
      .populate("subscriptions")
      .exec();

    const isMember = searchedCommunity?.subscriptions?.find(
      (item) => item.user.toString() === session?.user?._id
    );

    // Is already a member
    if (isMember) {
      throw new ConflictError("User is already a member in the community");
    }

    if (!searchedCommunity) {
      throw new NoContentError(
        "Community does not exist. It may be deleted or the slug is wrong"
      );
    }

    // Start creation
    let newSubscription = await Subscription.create({
      community: searchedCommunity._id,
      user: session?.user?._id,
    });

    newSubscription = await Subscription.findOne({
      community: searchedCommunity._id,
      user: session?.user?._id,
    }).populate("user community");

    return NextResponse.json(
      { subscription: newSubscription },
      { status: StatusCodes.CREATED }
    );
  }
);

// Leave or delete a member from a community
export const DELETE = asyncHandler(
  async (
    req: NextRequest,
    { params: { slug } }: { params: { slug: string } }
  ) => {
    // Get Session
    const session = await getSession();

    // Is signed in?
    if (!session?.user) {
      throw new UnAuthorizedError("You must sign in first");
    }

    // Get the community by its slug
    const searchedCommunity = await Community.findOne({
      title: slug,
    });

    if (!searchedCommunity) {
      throw new NoContentError(
        "Subreddit does not exist. It may be deleted or the slug is wrong"
      );
    }

    // Get userId from searchParams
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // Admin want to delete a member
    if (userId) {
      if (!session?.user?._id === searchedCommunity?.creator) {
        throw new UnAuthorizedError("You must be an admin of the community");
      }

      if (userId === searchedCommunity?.creator) {
        throw new UnAuthorizedError("Admin can not leave the community");
      }

      // Start delete for admin role
      await Subscription.findOneAndDelete({
        subreddit: searchedCommunity._id,
        user: userId,
      });

      return NextResponse.json(
        { msg: "User has been deleted successfully" },
        { status: StatusCodes.OK }
      );
    }

    // User want to leave the community
    if (session?.user?._id === searchedCommunity?.creator) {
      throw new UnAuthorizedError("Admin can not leave the community");
    }

    await Subscription.findOneAndDelete({
      community: searchedCommunity._id,
      user: session?.user?._id,
    });

    return NextResponse.json(
      { msg: "User has been deleted successfully" },
      { status: StatusCodes.OK }
    );
  }
);

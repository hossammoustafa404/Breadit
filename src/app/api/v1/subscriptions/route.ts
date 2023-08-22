import {
  BadRequestError,
  ConflictError,
  NoContentError,
  UnAuthorizedError,
} from "@lib/api/appErrors";
import asyncHandler from "@lib/api/asyncHandler";
import { getSession } from "@lib/api/nextAuth";
import Community from "@models/community";
import Subscription from "@models/subscription";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

// Create subscription
export const POST = asyncHandler(async (req: NextRequest) => {
  // Is sign in?
  const session: any = await getSession();

  if (!session?.user) {
    throw new UnAuthorizedError("You must sign in first");
  }

  // Validate on community query
  const { searchParams } = new URL(req.url);

  const community = searchParams.get("community");
  if (!community) {
    throw new BadRequestError("Community query must be included");
  }

  // Is community exist?
  const searchedCommunity: CommunityResponse | null = await Community.findOne({
    title: community,
  })
    .populate("subscriptions")
    .exec();

  if (!community) {
    throw new NoContentError("Wrong slug or community has been deleted");
  }

  //   Is current user a member in the community?
  const isMember = searchedCommunity?.subscriptions?.find(
    (item) => item.user.toString() === session?.user?._id
  );

  if (isMember) {
    throw new ConflictError("User is already a member in the community");
  }

  // Start creation
  const newSubscription = await Subscription.create({
    community: searchedCommunity?._id,
    user: session?.user?._id,
  });

  return NextResponse.json(
    { subscription: newSubscription },
    { status: StatusCodes.CREATED }
  );
});

// Leave or delete a member from a community
export const DELETE = asyncHandler(async (req: NextRequest) => {
  // Is signed in?
  const session = await getSession();
  if (!session?.user) {
    throw new UnAuthorizedError("You must sign in first");
  }

  //   Validate on community query
  const { searchParams } = new URL(req.url);

  const community = searchParams.get("community");
  if (!community) {
    throw new BadRequestError("Community query must be included");
  }

  // Get the community by its slug
  const searchedCommunity: CommunityResponse | null = await Community.findOne({
    title: community,
  })
    .populate("subscriptions")
    .exec();

  if (!searchedCommunity) {
    throw new NoContentError(
      "Community does not exist. It may be deleted or the slug is wrong"
    );
  }

  //   Is current user the superAdmin of the community?
  const isSuperAdmin = session?.user?._id === searchedCommunity?.superAdmin;

  let user: string | null;

  // Is super admin want to delete a member?
  if (isSuperAdmin) {
    // Validate on user query
    user = searchParams.get("user");
    if (!user) {
      throw new BadRequestError("User query must be included");
    }
  }

  user = session?.user?._id;

  // Is user already out of the community?
  const isMember = searchedCommunity?.subscriptions?.find(
    (item) => item.user.toString() === user
  );

  if (!isMember) {
    throw new NoContentError("User is already out of the community");
  }

  // Start deletion
  await Subscription.findOneAndDelete({
    community: searchedCommunity._id,
    user,
  });

  return NextResponse.json(
    { msg: "User has been deleted successfully" },
    { status: StatusCodes.OK }
  );
});

// Get all subscriptions
export const GET = asyncHandler(async (req: NextRequest) => {
  // Create query object
  let queryObj: { user?: string } = {};
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user");
  if (user) {
    queryObj.user = user;
  }

  const searchedSubscriptions = await Subscription.find(queryObj).populate(
    "community"
  );

  return NextResponse.json(
    {
      nbhits: searchedSubscriptions.length,
      subscriptions: searchedSubscriptions,
    },
    { status: StatusCodes.OK }
  );
});

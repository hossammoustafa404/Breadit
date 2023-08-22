import { ConflictError, UnAuthorizedError } from "@lib/api/appErrors";
import asyncHandler from "@lib/api/asyncHandler";
import { getSession } from "@lib/api/nextAuth";
import {
  createCommunityPayload,
  createCommunityPayloadSchema,
} from "@lib/validators/forms/createCommunity";
import Community from "@models/community";
import { StatusCodes } from "http-status-codes";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Create Community
export const POST = asyncHandler(async (req: NextRequest) => {
  // Is sign in?
  const session: Session | null = await getSession();
  if (!session?.user) {
    throw new UnAuthorizedError(
      "You are not allowed to create community. Sign in first."
    );
  }

  // Validation on body
  const body: createCommunityPayload = await req.json();
  const communityPayload: createCommunityPayload =
    createCommunityPayloadSchema.parse(body);

  // Is title already exist?
  const searchedCommunity: CommunityResponse | null = await Community.findOne({
    title: communityPayload.title,
  });

  if (searchedCommunity) {
    throw new ConflictError("Title is already exist.Try another one");
  }

  // Start creation
  const createdCommunity: CommunityResponse | null = await Community.create(
    communityPayload
  );

  return NextResponse.json(
    { community: createdCommunity },
    { status: StatusCodes.CREATED }
  );
});

// Delete all for testing purposes
export const DELETE = async () => {
  await Community.deleteMany({});
  return NextResponse.json({ msg: "All deleted" }, { status: 201 });
};

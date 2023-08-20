import { ConflictError, UnAuthorizedError } from "@lib/api/appErrors";
import asyncHandler from "@lib/api/asyncHandler";
import { getSession } from "@lib/api/nextAuth";
import { createCommunityPayloadSchema } from "@lib/validators/forms/createCommunity";
import Subreddit from "@models/subreddit";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  const session = await getSession();

  if (!session?.user) {
    throw new UnAuthorizedError(
      "You are not allowed to create community. Sign in first."
    );
  }

  const body = await req.json();
  const subredditPayload = createCommunityPayloadSchema.parse(body);

  const searchedSubreddit = await Subreddit.findOne({
    title: subredditPayload.title,
  });

  if (searchedSubreddit) {
    throw new ConflictError("Title is already exist.Try another one");
  }

  const createdSubreddit = await Subreddit.create(subredditPayload);

  return NextResponse.json(
    { subreddit: createdSubreddit },
    { status: StatusCodes.CREATED }
  );
});

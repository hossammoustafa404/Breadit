import { NoContentError } from "@lib/api/appErrors";
import asyncHandler from "@lib/api/asyncHandler";
import connectDB from "@lib/api/connectDB";
import Community from "@models/community";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

// Get single community
export const GET = asyncHandler(
  async (
    req: NextRequest,
    { params: { slug } }: { params: { slug: string } }
  ) => {
    await connectDB();
    const searchedCommunity: CommunityResponse | null = await Community.findOne(
      {
        title: slug,
      }
    )
      .populate("superAdmin")
      .populate({ path: "subscriptions" })
      .exec();

    if (!searchedCommunity) {
      throw new NoContentError("Slug is wrong or community may be deleted");
    }

    return NextResponse.json(
      { community: searchedCommunity },
      { status: StatusCodes.OK }
    );
  }
);

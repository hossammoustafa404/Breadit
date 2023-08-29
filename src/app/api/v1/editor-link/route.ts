import { BadRequestError } from "@lib/api/appErrors";
import asyncHandler from "@lib/api/asyncHandler";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const link = searchParams.get("url");

  if (!link) {
    throw new BadRequestError("url query is required");
  }
  const { data } = await axios.get(link);

  const matchedTitle = data.match(/<title>.*?<\/title>/);
  const title = matchedTitle ? matchedTitle[1] : "";

  const matchedDescription = data.match(
    /<meta name="description" content="(.*?)">/
  );
  const description = matchedDescription ? matchedDescription[1] : "";

  const matchedImage = data.match(/<meta property="og:image" content="(.*?)">/);
  const imageUrl = matchedImage ? matchedImage[1] : "";

  return NextResponse.json({
    success: 1,
    meta: { title, description, image: { url: imageUrl } },
  });
});

import { z } from "zod";
import { Types } from "mongoose";

// For Form
export const createCommunitySchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(21, "Title must not exceeds 21 characters"),
});

export type createCommunityValues = z.infer<typeof createCommunitySchema>;

// For payload
export const createCommunityPayloadSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(21, "Title must not exceeds 21 characters"),
  creator: z.string(),
});

export type createCommunityPayload = z.infer<
  typeof createCommunityPayloadSchema
>;

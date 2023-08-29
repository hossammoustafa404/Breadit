import { z } from "zod";

// Form
export const communityFormValidator = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(21, "Title must not exceeds 21 characters"),
});

export type communityFormValues = z.infer<typeof communityFormValidator>;

// Payload
export const communityPayloadValidator = communityFormValidator;

export type communityPayload = communityFormValues;

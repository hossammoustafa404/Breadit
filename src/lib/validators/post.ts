import { z } from "zod";

// Form
export const postFormValidator = z.object({
  title: z.string().nonempty(),
});

export type PostFormValues = z.infer<typeof postFormValidator>;

// Payload
export const postPayloadValidator = z.object({
  title: z.string(),
  content: z.any(),
  community: z.string(),
});

export type PostPayload = z.infer<typeof postPayloadValidator>;

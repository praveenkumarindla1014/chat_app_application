import { z } from "zod";

export const sendMessageSchema = z.object({
  text: z.string().trim().nullable().optional(),
  image: z.string().nullable().optional(),
}).refine(
  (data) => data.text || data.image,
  { message: "Message must contain text or an image" }
);

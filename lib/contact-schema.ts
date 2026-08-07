import { z } from "zod";

const cleanText = (max: number) => z.string().trim().max(max).transform((value) => value.replace(/[<>]/g, ""));

// FORM FIELDS: update this schema and ContactForm together when adding or renaming fields.
export const contactSchema = z.object({
  name: cleanText(80).pipe(z.string().min(2, "Please enter your name.")),
  email: z.email("Please enter a valid email address.").max(254),
  company: cleanText(100).optional().default(""),
  projectType: cleanText(80).optional().default(""),
  message: cleanText(3000).pipe(z.string().min(10, "Please share at least a few details.")),
  website: z.string().max(0, "Spam detected.").optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

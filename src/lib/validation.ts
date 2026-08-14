import { z } from "zod";

export const investorSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name or company name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a valid phone number."),
  capacity: z.string().min(1, "Please select an investment capacity."),
  development: z.string().optional(),
  message: z.string().trim().optional(),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Please confirm you agree to be contacted.",
    }),
});
export type InvestorFormData = z.infer<typeof investorSchema>;

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().optional(),
  message: z.string().trim().min(5, "Please enter a short message."),
  developmentName: z.string().optional(),
  developmentSlug: z.string().optional(),
});
export type InquiryFormData = z.infer<typeof inquirySchema>;
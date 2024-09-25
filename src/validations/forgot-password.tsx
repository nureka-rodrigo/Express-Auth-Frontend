import { z } from "zod";

export const emailSchema = z.object({
  email: z
  .string()
  .email({message: "Invalid email address.",}),
});

export const OtpSchema = z.object({
  pin: z
  .string()
  .min(6, {message: "OTP must be 6 characters.",}),
});

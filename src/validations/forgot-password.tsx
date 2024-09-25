import { z } from "zod";

export const emailSchema = z.object({
  email: z
  .string()
  .email({message: "Invalid email address.",}),
});

export const otpSchema = z.object({
  pin: z
  .string()
  .min(6, {message: "OTP must be 6 characters.",}),
});

export const passwordSchema = z.object({
  password: z
  .string()
  .min(8, { message: "Password must be at least 8 characters" }),
});

import * as z from "zod";

// Global Field
// =====================
export const general_rule = {
  emailField: z.string().email("Invalid email address"),
  otpField: z
    .string()
    .length(6)
    .regex(/^[0-9]{6}$/),
  passwordField: z.string().min(6).max(20),
};

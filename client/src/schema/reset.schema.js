import * as z from "zod";
import { general_rule } from "./generalRule.schema";

export const ResetPassDefaultValues = {
  email: "",
  otp: "",
  password: "",
  cPassword: "",
};

export const ResetPasswordSchema = z
  .object({
    email: general_rule.emailField,
    otp: general_rule.otpField,
    password: general_rule.passwordField,
    cPassword: general_rule.passwordField,
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match",
    path: ["cPassword"],
  });

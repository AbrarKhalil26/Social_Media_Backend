import * as z from "zod";
import { GENDER_ENUM } from "../constants/enums";

export const RegisterDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  cPassword: "",
  dateOfBirth: new Date(),
  gender: GENDER_ENUM.male,
  phone: "",
  address: "",
};

export const RegisterSchema = z
  .object({
    firstName: z
      .string({ message: "First Name is required" })
      .min(3, { message: "First Name must be at least 3 characters long." }),
    lastName: z
      .string({ message: "Last Name is required" })
      .min(3, { message: "Last Name must be at least 3 characters long." }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
    cPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
    dateOfBirth: z.date({ required_error: "Date of Birth is required" }),
    gender: z.enum(Object.values(GENDER_ENUM)).optional().or(z.literal("")),
    phone: z
      .string()
      // .regex(/^01[0125][0-9]{8}$/, { message: "Invalid phone number" })
      .optional()
      .or(z.literal("")),
    address: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.cPassword, {
    message: "Passwords do not match",
    path: ["cPassword"],
  });

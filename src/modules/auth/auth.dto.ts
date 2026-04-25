import * as z from "zod";
import { signUpSchema } from "./auth.validation";

export type SignupRequestBody = z.infer<typeof signUpSchema.body>;

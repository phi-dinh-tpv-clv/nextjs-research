import * as z from "zod";

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please input to this field",
    })
    .max(40, {
      message: "Email is exceed 40 characters",
    })
    .regex(EMAIL_REGEX, {
      message: "Pleas input a valid email address",
    }),
});

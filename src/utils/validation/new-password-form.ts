import * as z from "zod";

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(100, {
        message: "Password must be maximum 100 characters.",
      }),
    confirm: z.string(),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Confirm Password does not match",
    path: ["confirm"],
  });

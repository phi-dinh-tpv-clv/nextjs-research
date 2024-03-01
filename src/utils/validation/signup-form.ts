import * as z from "zod";

const FULL_NAME_REGEX = /^[a-zA-Z\s]*$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signupFormSchema = z
  .object({
    fullname: z
      .string()
      .min(3, {
        message: "Name must be at least 3 characters.",
      })
      .max(100, {
        message: "Name is too long.",
      })
      .regex(FULL_NAME_REGEX, {
        message: "Name should contains only alphabetical characters and spaces",
      }),
    email: z
      .string()
      .min(6, {
        message: "Email must be at least 6 characters.",
      })
      .max(40, {
        message: "Email is exceed 40 characters",
      })
      .regex(EMAIL_REGEX, {
        message: "Invalid email address",
      }),
    password: z
      .string()
      .min(8, {
        message: "Username must be at least 8 characters.",
      })
      .max(100),
    // .regex(PASSWORD_REGEX, {
    //   message: "Invalid password. Please follow the password requirements.",
    // }),
    confirm: z
      .string()
      .min(8, {
        message: "Username must be at least 8 characters.",
      })
      .max(100),
    // .regex(PASSWORD_REGEX, {
    //   message: "Invalid password. Please follow the password requirements.",
    // }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Password do not match!",
    path: ["confirm"],
  });

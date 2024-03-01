import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const uploadAvatarSchema = z
  .object({
    avatar: z.any(),
    image: z.any(),
  })
  .refine((data) => data.avatar?.length !== 0, {
    message: "File is required",
    path: ["image"],
  })
  .refine(
    (data) => {
      const files = data.avatar;
      return files?.[0]?.size <= MAX_FILE_SIZE;
    },
    {
      message: `Max image size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
      path: ["image"],
    },
  )
  .refine(
    (data) => {
      const files = data.avatar;
      return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
    },
    {
      message: "Only .jpg, .jpeg and .png formats are supported.",
      path: ["image"],
    },
  );

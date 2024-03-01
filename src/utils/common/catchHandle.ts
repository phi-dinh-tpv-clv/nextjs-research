import { ApiReponse } from "@/types/response";
import { toast } from "react-toastify";

export const catchHandle = (e: any): void => {
  const response: ApiReponse = e?.response;

  try {
    if (response.errors.length > 0) {
      const message = response.errors[0].message;
      if (response.errors[0].statusCode === 401) {
        toast.error("Login session expired");
      } else {
        toast.error(message);
      }
    }
  } catch {
    toast.error("Something went wrong");
  }
};

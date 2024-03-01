import { QueryOptions, useMutation } from "@tanstack/react-query";
import { mutationRequest } from "../common/mutationRequest";
import { useSession } from "next-auth/react";

export const useGQLMutation = (query: any, options: QueryOptions = {}) => {
  const { data, status } = useSession();

  let token = "";
  if (status === "authenticated") {
    token = [data.tokens.type, data.tokens.token].join(" ");
  }

  const mutationFn = async (payload: any) => await mutationRequest(query, payload, token);

  return useMutation({ mutationFn, ...options });
};

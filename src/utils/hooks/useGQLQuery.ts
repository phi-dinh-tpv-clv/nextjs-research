import { QueryKey, QueryOptions, useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { useSession } from "next-auth/react";

export const useGQLQuery = (queryKey: QueryKey, query: any, variables: any = {}, options: QueryOptions = {}) => {
  const endpoint = process.env.BACKEND_API_URL ?? "http://localhost:5001/graphql";
  const { data, status } = useSession();

  let token = "";
  if (status === "authenticated") {
    token = [data.tokens.type, data.tokens.token].join(" ");
  }

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: token,
    },
  });

  const queryFn = async () => await graphQLClient.request(query, variables);

  return useQuery({ queryKey, queryFn, ...options, enabled: status === "authenticated" });
};

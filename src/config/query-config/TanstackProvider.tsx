"use client";

import React from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { QueryClientProvider, QueryClient, QueryCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

function TanstackProvider({ children }: any) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
      mutations: {
        onError: (e: any) => {
          if (e.response) {
            const errors = e.response.errors;
            if (errors[0] && errors[0].code === "UNAUTHENTICATED" && errors[0]?.statusCode === 401) {
              // handle unauthenticated errors
              toast.error("Your session has expired!");
              signOut({ callbackUrl: "/auth/login" });
            }
          }
        },
      },
    },
    queryCache: new QueryCache({
      onError: (e: any) => {
        if (e.response) {
          const errors = e.response.errors;
          if (errors[0] && errors[0].code === "UNAUTHENTICATED" && errors[0]?.statusCode === 401) {
            toast.error("Your session has expired!");
            signOut({ callbackUrl: "/auth/login" });
          }
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export { TanstackProvider };

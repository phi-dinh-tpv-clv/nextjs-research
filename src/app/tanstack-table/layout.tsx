"use client";

import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/components/tanstack-table/theme/theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

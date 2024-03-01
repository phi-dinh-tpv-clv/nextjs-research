import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import CommonTable from "@/components/tanstack-table/CommonTable";

type Props = {};

const TanstackTableDemo = (props: Props) => {
  return (
    <Box maxW={1000} mx="auto" px={6} pt={24} fontSize="sm">
      <Heading mb={10}>TanStack Table</Heading>
      <CommonTable />
    </Box>
  );
};

export default TanstackTableDemo;

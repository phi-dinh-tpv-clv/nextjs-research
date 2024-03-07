import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import TanstackTable from "@/components/tanstack-table/TaskTable";

const TanstackTableDemo: React.FC = () => {
  return (
    <Box mx="auto" px={6} pt={24} fontSize="sm" className="container">
      <Heading mb={10}>TanStack Table</Heading>

      <TanstackTable />
    </Box>
  );
};

export default TanstackTableDemo;

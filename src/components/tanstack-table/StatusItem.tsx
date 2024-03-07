import { Flex } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { ColorIcon } from "./StatusCell";
import { TableStatusTask } from "@/utils/tanstack-table/table-tasks";
import { ColumnFiltersState } from "@tanstack/react-table";

interface StatusItemProps {
  status: TableStatusTask;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  isActive: boolean;
}

const StatusItem: React.FC<StatusItemProps> = ({ status, setColumnFilters, isActive }) => (
  <Flex
    align="center"
    cursor="pointer"
    borderRadius={5}
    fontWeight="bold"
    p={1.5}
    bg={isActive ? "gray.800" : "transparent"}
    _hover={{
      bg: "gray.800",
    }}
    onClick={() =>
      setColumnFilters((prev) => {
        const statuses = prev.find((filter) => filter.id === "status")?.value as any[];
        if (!statuses) {
          return prev.concat({
            id: "status",
            value: [status.id],
          });
        }

        return prev.map((f) =>
          f.id === "status"
            ? {
                ...f,
                value: isActive ? statuses.filter((s) => s !== status.id) : statuses.concat(status.id),
              }
            : f,
        );
      })
    }
  >
    <ColorIcon color={status.color} mr={3} />
    {status.name}
  </Flex>
);

export default StatusItem;

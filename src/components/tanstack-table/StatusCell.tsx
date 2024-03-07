import { STATUSES, TableStatusTask } from "@/utils/tanstack-table/table-tasks";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";

type IconProps = {
  color: string;
  mr?: number;
};

export const ColorIcon: React.FC<IconProps> = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3px" {...props} />
);

type StatusProps = {
  row: any;
  column: any;
  table: any;
  value: TableStatusTask;
};

const StatusCell: React.FC<StatusProps> = ({ row, column, table, value }) => {
  const { name, color } = value || {};

  const updateData = (value: any) => {
    table.options?.meta?.updateData(row.index, column.id, value);
  };

  return (
    <Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
      <MenuButton h="100%" w="100%" textAlign="left" p={1.5} bg={color || "transparent"} color="gray.900">
        {name}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => updateData(null)}>
          <ColorIcon color="red.400" mr={3} />
          None
        </MenuItem>

        {STATUSES.map((status) => (
          <MenuItem onClick={() => updateData(status)} key={status.id}>
            <ColorIcon color={status.color} mr={3} />
            {status.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default StatusCell;

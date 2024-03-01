"use client";

import React, { useState } from "react";
import TANSTACK_TABLE_DATA from "@/utils/tanstack-table/dummy-data";
import { COLUMN_STACK_TABLE } from "@/utils/tanstack-table/table";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Box } from "@chakra-ui/react";

type Props = {};

const CommonTable = (props: Props) => {
  const [data, setData] = useState(TANSTACK_TABLE_DATA);
  const table = useReactTable({
    data,
    columns: COLUMN_STACK_TABLE,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(table.getHeaderGroups());

  return (
    <Box>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" key={header.id} w={header.getSize()}>
                {header.column.columnDef.header}
                <Box className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}></Box>
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box className="td" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CommonTable;

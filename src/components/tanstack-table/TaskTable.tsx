"use client";

import React, { useState } from "react";
import TANSTACK_TABLE_DATA from "@/utils/tanstack-table/table-tasks";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Box, Button, ButtonGroup, Flex, Icon, Select, Spacer, Text } from "@chakra-ui/react";
import { COLUMN_STACK_TABLE } from "@/utils/tanstack-table/config-table";
import Filters from "./Filters";
import { ArrowUpDownIcon } from "lucide-react";

const TanstackTable: React.FC = () => {
  const [data, setData] = useState(TANSTACK_TABLE_DATA);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns: COLUMN_STACK_TABLE,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",

    state: {
      columnFilters,
    },
  });

  return (
    <Box>
      <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />

      <Box className="table" w={"100%"}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box
                className="th"
                key={header.id}
                w={header.getSize()}
                onClick={() => {
                  if (header.column.getCanSort()) {
                    header.column.getToggleSortingHandler();
                  }
                }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getCanSort() && (
                  <Icon as={ArrowUpDownIcon} mx={3} fontSize={14} onClick={header.column.getToggleSortingHandler()} />
                )}
                {header.column.getIsSorted()
                  ? {
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string]
                  : ""}
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                />
              </Box>
            ))}
          </Box>
        ))}

        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box
                className={`td ${/select/.test(cell.id) ? "flex items-center justify-center" : ""}`}
                key={cell.id}
                w={cell.column.getSize()}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      {/* pagination right here */}
      <br />
      <Text mb={2}>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </Text>
      <Flex justifyContent={"space-between"}>
        <ButtonGroup size="md" isAttached variant="outline" spacing={6}>
          <Button onClick={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()}>
            {"<"}
          </Button>
          <Button onClick={() => table.nextPage()} isDisabled={!table.getCanNextPage()}>
            {">"}
          </Button>
          <span className="flex items-center gap-1 pl-5">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
            </strong>
          </span>
        </ButtonGroup>

        <Select
          w={"200px"}
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
};

export default TanstackTable;

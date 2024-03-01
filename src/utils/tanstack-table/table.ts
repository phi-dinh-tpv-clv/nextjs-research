import { ColumnDef } from "@tanstack/react-table";

export const COLUMN_STACK_TABLE: ColumnDef<any>[] = [
  {
    accessorKey: "task",
    header: "Task",
    size: 225,
    // cell: (props) => (<p>{props.getValue}</p>),
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "status",
    header: "Status",
    // cell: StatusCell,
    enableSorting: false,
    enableColumnFilter: true,
    // filterFn: (row, columnId, filterStatuses) => {
    //   if (filterStatuses.length === 0) return true;
    //   const status = row.getValue(columnId);
    //   return filterStatuses.includes(status?.id);
    // },
  },
  {
    accessorKey: "due",
    header: "Due",
    // cell: DateCell,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 225,
    // cell: EditableCell,
  },
];

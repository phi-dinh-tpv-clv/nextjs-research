import { ColumnDef } from "@tanstack/react-table";
import { TableStatusTask, TableTask } from "./table-tasks";
import EditableCell from "@/components/tanstack-table/EditableCell";
import StatusCell from "@/components/tanstack-table/StatusCell";
import { Text } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";

export const COLUMN_STACK_TABLE: ColumnDef<TableTask>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        />
      );
    },
    size: 100,
    cell: ({ row }) => {
      return (
        <Checkbox
          className="flex justify-center"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "task",
    header: "Task",
    size: 350,
    cell: (props) => {
      return (
        <EditableCell
          index={props.cell.row.index}
          column={props.column}
          table={props.table}
          initialValue={props.getValue() as string}
        />
      );
    },
    enableSorting: true,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 200,
    cell: (props) => {
      return (
        <StatusCell
          row={props.row}
          column={props.column}
          table={props.table}
          value={props.getValue() as TableStatusTask}
        />
      );
    },
    enableSorting: false,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length === 0) {
        return true;
      }

      const status: TableStatusTask = row.getValue(columnId);
      return filterStatuses.includes(status?.id);
    },
  },
  {
    accessorKey: "due",
    header: "Due",
    size: 250,
    // cell: DateCell,
    cell: (props) => {
      return <Text>{(props.cell.getValue() as Date)?.toDateString()}</Text>;
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 450,
    cell: (props) => {
      return (
        <EditableCell
          index={props.cell.row.index}
          column={props.column}
          table={props.table}
          initialValue={props.getValue() as string}
        />
      );
    },
  },
];

import { HStack, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import FilterPopover from "./FilterPopover";
import { SearchIcon } from "lucide-react";
import { ColumnFiltersState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

type FilterProps = {
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
};

const Filters: React.FC<FilterProps> = ({ columnFilters, setColumnFilters }) => {
  const taskName = (columnFilters.find((f) => f.id === "task")?.value as string) || "";

  const onFilterChange = (id: string, value: any) =>
    setColumnFilters((prev: any) =>
      prev
        .filter((f: any) => f.id !== id)
        .concat({
          id,
          value,
        }),
    );

  return (
    <HStack mb={6} spacing={3}>
      <InputGroup size="sm" maxW="12rem">
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} />
        </InputLeftElement>
        <Input
          type="text"
          variant="filled"
          placeholder="Task name"
          borderRadius={5}
          value={taskName ?? ""}
          onChange={(e) => onFilterChange("task", e.target.value)}
        />
      </InputGroup>

      <FilterPopover columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
    </HStack>
  );
};
export default Filters;

"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { optionDataType } from "../controlled/ControlledSelect";

import { UserDataType } from "@/types/user.types";
import { ComboSearchResults } from "./ComboSearchResults";

const POPOVER_WIDTH = "min-w-[300px]";

type ComboboxType = {
  handleValueChange?: (user: UserDataType) => void;
  editMode?: boolean;
  editData?: any;
  CustomOptionsItem?: React.ComponentType<any>;
};

export function CustomCombobox({ handleValueChange, editMode, editData, CustomOptionsItem, ...props }: ComboboxType) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<UserDataType | undefined>();

  const handleSetActive = React.useCallback((data: UserDataType) => {
    setSelected(data);
    handleValueChange?.(data);

    // OPTIONAL: close the combobox upon selection
    setOpen(false);
  }, []);

  React.useEffect(() => {
    if (editMode) {
      setSelected(editData);
      handleValueChange?.(editData);
    }
  }, [editData]);

  const displayName = selected?.fullname ? selected.fullname : "Select User";

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", POPOVER_WIDTH)}
          data-cy="combo-input"
        >
          {displayName}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" className={cn("p-0", POPOVER_WIDTH)}>
        <ComboSearchResults
          selectedResult={selected}
          onSelectResult={handleSetActive}
          CustomOptionsItem={CustomOptionsItem}
        />
      </PopoverContent>
    </Popover>
  );
}

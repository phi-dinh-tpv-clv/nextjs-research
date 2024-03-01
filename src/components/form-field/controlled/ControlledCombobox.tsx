"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { Control, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { optionDataType } from "./ControlledSelect";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/utils/hooks/useDebouncedValue";
import { UserDataType } from "@/types/user.types";
import { Label } from "@/components/ui/label";
import { CustomCombobox } from "../custom/CustomCombobox";

type ControlledCombobox = {
  control: Control<any>;
  name: string;
  label?: string;
  onSelect: (value: any) => void;
  placeholder?: string;
  defaultValue?: string;
  CustomOptionsItem?: React.ComponentType<any>;
  emptyState?: string;
  onValueChange?: (keyword: string) => void;
  editMode?: boolean;
  editData?: any;
};

export function ControlledCombobox({
  control,
  name,
  label,
  onSelect,
  editMode,
  editData,
  CustomOptionsItem,
  ...props
}: ControlledCombobox) {
  const handleValueChange = (value: UserDataType) => {
    onSelect(value);
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem data-cy={`form-item-${name}`} className="flex w-full flex-col">
          {label && <Label>{label}</Label>}
          <CustomCombobox
            editMode={editMode}
            editData={editData}
            handleValueChange={handleValueChange}
            CustomOptionsItem={CustomOptionsItem}
            {...props}
          />
          <FormMessage data-cy="error-message" />
        </FormItem>
      )}
    />
  );
}

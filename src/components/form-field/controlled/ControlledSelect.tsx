import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Control } from "react-hook-form";

export type optionDataType = {
  label: string;
  value: string;
  avtUrl?: string;
  email?: string;
};

type ControlledSelectProps = {
  control: Control<any>;
  name: string;
  defaultValue: string;
  dataList: any[];
  label?: string;
};

export function ControlledSelect({ control, name, defaultValue, dataList, label, ...props }: ControlledSelectProps) {
  const [selectValue, setSelectValue] = useState<any>(dataList[0]?.value);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem data-cy={`form-item-${name}`} {...props}>
          {label && <Label>{label}</Label>}
          <Select
            onValueChange={(value) => {
              setSelectValue(value);
              field.onChange(value);
            }}
            value={selectValue || defaultValue}
          >
            <FormControl>
              <SelectTrigger data-cy="select-input">
                <SelectValue data-cy="select-value" placeholder={dataList[0]?.label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent data-cy="list-option">
              {dataList.map((item) => (
                <SelectItem data-cy={`option-${item.value}`} key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage data-cy="error-message" />
        </FormItem>
      )}
    />
  );
}

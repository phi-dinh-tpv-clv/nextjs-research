import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import React from "react";
import { Control } from "react-hook-form";
import { CustomTextarea, TextareaProps } from "../custom/CustomTextarea";

interface ControlledTextareaProps extends TextareaProps {
  control: Control<any>;
  name: string;
  messageClassName?: string;
}

const ControlledTextarea = ({ control, name, messageClassName, ...props }: ControlledTextareaProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem data-cy={`form-item-${name}`}>
          <FormControl>
            <CustomTextarea {...field} {...props} />
          </FormControl>
          <FormMessage data-cy="error-message" className={messageClassName} />
        </FormItem>
      )}
    />
  );
};

export default ControlledTextarea;

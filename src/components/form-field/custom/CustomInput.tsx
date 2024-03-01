import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { MouseEventHandler } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  Icon?: React.ElementType;
  onIconClick?: MouseEventHandler<HTMLDivElement>;
  classNameIcon?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, Icon, label, onIconClick, classNameIcon, ...props }, ref) => {
    return (
      <div className="relative grid w-full items-center gap-1.5">
        {label && <Label htmlFor={id}>{label}</Label>}
        <Input id={id} {...props} ref={ref} />
        <div onClick={onIconClick} className={`absolute right-3 top-1/2 ${classNameIcon}`}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export { CustomInput };

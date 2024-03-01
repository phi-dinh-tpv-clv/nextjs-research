import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

const CustomTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ id, label, ...props }, ref) => {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} {...props} ref={ref} />
    </div>
  );
});

CustomTextarea.displayName = "CustomTextarea";

export { CustomTextarea };

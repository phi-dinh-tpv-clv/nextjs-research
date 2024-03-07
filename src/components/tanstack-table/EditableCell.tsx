import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface EditAbleProps {
  index: number;
  column: any;
  table: any;
  initialValue: string | null;
}

const EditableCell: React.FC<EditAbleProps> = ({ initialValue, index, column, table }) => {
  // const initialValue = getValue();
  // console.log("initialValue, ", initialValue);
  const [value, setValue] = useState<string | null>(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      value={value ?? ""}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      variant="filled"
      size="sm"
      w="85%"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
    />
  );
};

export default EditableCell;

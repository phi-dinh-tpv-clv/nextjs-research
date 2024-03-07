import React, { forwardRef } from "react";
import { Box, Center, Icon } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { CalendarIcon } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

// interface DateCustomProps {
//   clearDate: () => void;
//   onClick: () => void;
// }
// type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

// // eslint-disable-next-line react/display-name
// const DateCustomInput = forwardRef<DateCustomProps, ButtonProps>(({ value, onClick, clearDate }, ref) => (
//   <Center
//     ref={ref}
//     onClick={(el: any) => {
//       if (onClick) {
//         onClick(el);
//       }
//     }}
//     cursor="pointer"
//   >
//     {value ? (
//       <>
//         {value}
//         <Box
//           pos="absolute"
//           right={3}
//           fontSize="md"
//           color="red.300"
//           onClick={(e) => {
//             e.stopPropagation();
//             clearDate();
//           }}
//         >
//           &times;
//         </Box>
//       </>
//     ) : (
//       <Icon as={CalendarIcon} fontSize="xl" />
//     )}
//   </Center>
// ));

type DateCellProps = {
  row: any;
  column: any;
  table: any;
  value: null | Date;
};

const DateCell: React.FC<DateCellProps> = ({ value, row, column, table }) => {
  // const { updateData } = table.options.meta;

  const updateData = (value: any) => {
    table.options?.meta?.updateData(row.index, column.id, value);
  };

  return (
    <DatePicker
      wrapperClassName="date-wrapper"
      dateFormat="MMM d"
      selected={value}
      onChange={(date) => updateData(date)}
      // customInput={<DateCustomInput clearDate={() => updateData(null)} />}
    />
  );
};
export default DateCell;

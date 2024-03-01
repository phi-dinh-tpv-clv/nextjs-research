import { UserDataType } from "./user.types";

export type TaskDataType = {
  taskTitle: string;
  taskDescription: string;
  assignUser: UserDataType;
  status: StatusDataType;
};

export type StatusDataType = {
  id: string;
  statusName: string;
  backgroundColor: string;
  textColor: string;
};

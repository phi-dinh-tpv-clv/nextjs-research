import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { TaskDataType } from "@/types/task.type";
import { TaskInfo } from "../task-board/GqlType";
import { DEFAULT_USER_IMAGE } from "@/utils/common/constants";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {
  isShow: boolean;
  handleCloseDialog: () => void;
  taskData: TaskDataType | any;
};

const TaskDetailPopup = ({ isShow, handleCloseDialog, taskData }: Props) => {
  const userImgUrl = taskData?.assignUser?.avatar;
  return (
    <Dialog open={isShow} onOpenChange={handleCloseDialog}>
      <DialogContent className="flex flex-col sm:min-w-[425px]" data-cy="detail-task-popup">
        <DialogHeader>
          <DialogTitle className="border-b py-5">{taskData?.taskTitle}</DialogTitle>
        </DialogHeader>
        <div className=" border-b pb-4">
          <div className="mb-3 text-base font-semibold ">
            <span className="mr-4">Status:</span>
            <span
              className="max-w-fit rounded-2xl px-2 py-1"
              style={{ backgroundColor: `${taskData?.status?.backgroundColor}`, color: `${taskData.status.textColor}` }}
            >
              {taskData.status.statusName}
            </span>
          </div>
          <div className="flex items-center">
            <span className="mr-3 text-base font-semibold ">Assigned to:</span>
            {taskData?.assginUser?.id ? (
              <div className="flex items-center gap-4">
                <Avatar className="flex h-7 w-7 rounded-full border">
                  {userImgUrl ? <AvatarImage src={userImgUrl} /> : <AvatarImage src={DEFAULT_USER_IMAGE} />}
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-base">{taskData.assignUser.fullname}</span>
                  <span className="text-sm font-semibold text-gray-500">{taskData.assignUser.email}</span>
                </div>
              </div>
            ) : (
              <span className="font-sm text-sm text-gray-500">{"No assigned user"}</span>
            )}
          </div>
        </div>
        <p className="mb-3 text-base font-semibold ">Description</p>
        <p className="pb-4">{taskData?.taskDescription ? taskData.taskDescription : "No description provided"}</p>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailPopup;

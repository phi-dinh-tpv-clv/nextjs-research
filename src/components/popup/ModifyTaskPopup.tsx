import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import TaskForm from "../form/TaskForm";

type Props = {
  isShow: boolean;
  handleCloseDialog: () => void;
  editMode?: boolean;
  taskData?: any;
};

const ModifyTaskPopup = ({ isShow, handleCloseDialog, editMode = false, taskData }: Props) => {
  return (
    <Dialog open={isShow} onOpenChange={handleCloseDialog}>
      <DialogContent className="flex flex-col gap-10 sm:min-w-[425px]" data-cy="modify-task-popup">
        <DialogHeader>
          <DialogTitle>{`${editMode ? "Update Task" : "Create New Task"}`}</DialogTitle>
        </DialogHeader>
        <TaskForm onEdit={editMode} handleCloseDialog={handleCloseDialog} taskData={taskData} />
      </DialogContent>
    </Dialog>
  );
};

export default ModifyTaskPopup;

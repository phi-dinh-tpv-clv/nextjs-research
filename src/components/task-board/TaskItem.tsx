import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Card } from "../ui/card";
import { TaskInfo } from "./GqlType";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGeneralStore } from "@/stores/useGeneralStore";
import ModifyTaskPopup from "../popup/ModifyTaskPopup";
import ConfirmationPopup from "../popup/ConfirmationPopup";
import { useGQLMutation } from "@/utils/hooks/useGQLMutation";
import { UPDATE_TASK } from "@/graphql/mutations/updateTask";
import { ARCHIVED_TASK_ID, DEFAULT_USER_IMAGE, QUERY_ALL_TASKS } from "@/utils/common/constants";
import { toast } from "react-toastify";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { catchHandle } from "@/utils/common/catchHandle";
import TaskDetailPopup from "../popup/TaskDetailPopup";

type Props = {
  task: any;
};

const TaskItem = ({ task }: Props) => {
  console.log(task);

  const queryClient = useQueryClient();
  const updateTask = useGQLMutation(UPDATE_TASK);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showPopupDetail, setShowPopupDetail] = useState<boolean>(false);
  const setDraggedTask = useGeneralStore((store) => store.setDraggedTask);
  const imageSrc = task.assignUser?.avatar;

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    const payload = {
      updateTaskId: task.id,
      updatedTaskData: {
        deleteFlag: "Y",
      },
    };

    updateTask.mutate(payload, {
      onSuccess: (res: any) => {
        handleClosePopup();
        toast.success("Task was removed");
        queryClient.invalidateQueries({ queryKey: [...QUERY_ALL_TASKS] });
      },
      onError: (err) => {
        console.log(err);
        catchHandle(err);
      },
    });
  };

  return (
    <>
      <Card
        data-cy={`task-item-${task.id}`}
        className="my-2 mr-2 cursor-grab p-3"
        draggable
        onDragStart={() => setDraggedTask(task)}
      >
        <div className="flex flex-col gap-2 break-words">
          <p
            className=" w-full cursor-pointer overflow-hidden pb-1 text-lg font-semibold hover:text-blue-500"
            onClick={() => {
              setShowPopupDetail(true);
            }}
          >
            <span data-cy="task-title" className="line-clamp-2">
              {task.taskTitle}
            </span>
          </p>
          <p className="w-full overflow-hidden pb-1 text-base">
            <span data-cy="task-desc" className="line-clamp-3">
              {task.taskDescription}
            </span>
          </p>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                data-cy="edit-btn"
                className="cursor-pointer p-2 hover:text-blue-500"
                onClick={() => {
                  setShowPopup(true);
                }}
              >
                <PencilIcon className="h-5 w-5" />
              </span>
              {!task.status?.persisted && (
                <span
                  data-cy="delete-btn"
                  className="cursor-pointer p-2 hover:text-blue-500"
                  onClick={() => {
                    setShowConfirmation(true);
                  }}
                >
                  <TrashIcon className="h-5 w-5 " />
                </span>
              )}
            </div>
            {task?.assignUser?.id && (
              <div
                className="relative z-0"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Avatar className="flex h-8 w-8 rounded-full border">
                  {imageSrc ? <AvatarImage src={imageSrc} /> : <AvatarImage src={DEFAULT_USER_IMAGE} />}
                </Avatar>
              </div>
            )}
            <span
              className="absolute -top-8 right-0 z-50 w-max max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-gray-500 px-2 py-1 text-center text-sm text-white opacity-90 group-hover:block"
              style={{ display: `${showTooltip ? "block" : "none"}` }}
            >
              {task.assignUser?.fullname}
            </span>
          </div>
        </div>
      </Card>
      <TaskDetailPopup isShow={showPopupDetail} handleCloseDialog={() => setShowPopupDetail(false)} taskData={task} />
      <ModifyTaskPopup isShow={showPopup} handleCloseDialog={handleClosePopup} editMode taskData={task || {}} />
      <ConfirmationPopup
        isShow={showConfirmation}
        handleCloseDialog={handleCloseConfirmation}
        onConfirmation={handleConfirm}
        onCancel={handleCloseConfirmation}
      />
    </>
  );
};

export default TaskItem;

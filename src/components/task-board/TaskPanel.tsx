import React, { useEffect, useState } from "react";
import { Square2StackIcon } from "@heroicons/react/24/outline";
import TaskItem from "./TaskItem";
import { GetAllTasksQuery } from "@/gql/graphql";
import { useGQLQuery } from "@/utils/hooks/useGQLQuery";
import { QUERY_ALL_TASKS } from "@/utils/common/constants";
import { GET_ALL_TASKS } from "@/graphql/queries/getAllTasks";
import { StatusInfo, TaskInfo } from "./GqlType";
import { useGeneralStore } from "@/stores/useGeneralStore";
import { toast } from "react-toastify";
import { useGQLMutation } from "@/utils/hooks/useGQLMutation";
import { UPDATE_TASK } from "@/graphql/mutations/updateTask";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  status: StatusInfo;
};

const TaskPanel = ({ status }: Props) => {
  const queryClient = useQueryClient();
  const [taskList, setTaskList] = useState<TaskInfo[]>([]);
  const { draggedTask, setDraggedTask, taskKeywork } = useGeneralStore();

  const { data } = useGQLQuery([...QUERY_ALL_TASKS, status.id], GET_ALL_TASKS, {
    statusId: status.id,
    title: taskKeywork,
    userId: null,
  });

  const [drop, setDrop] = useState<boolean>(false);
  const { mutate } = useGQLMutation(UPDATE_TASK);

  useEffect(() => {
    if (data) {
      const { tasks } = data as GetAllTasksQuery;
      setTaskList(tasks);
    }
  }, [data]);

  const onDropTask = () => {
    const previousStatus = draggedTask?.status?.id;
    if (previousStatus === status.id) {
      setDraggedTask(null);
      return;
    }

    setDrop(false);
    const payload = {
      updateTaskId: draggedTask?.id,
      updatedTaskData: {
        statusId: status.id,
      },
    };

    mutate(payload, {
      onSuccess: (_) => {
        toast("Update task status successfully", { type: "success" });
        queryClient.invalidateQueries({ queryKey: [...QUERY_ALL_TASKS, previousStatus] });
        queryClient.invalidateQueries({ queryKey: [...QUERY_ALL_TASKS, status.id] });
      },
      onError: (err: any) => {
        console.log("error", err);
      },
      onSettled: () => {
        setDraggedTask(null);
      },
    });
  };

  return (
    <div
      data-cy={`${status.id}`}
      className={`h-full rounded-xl p-3 pb-0 ${drop ? "!bg-slate-300" : ""}`}
      style={{ backgroundColor: `${!drop ? status.backgroundColor : ""}` }}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(_) => onDropTask()}
    >
      <div className="flex items-center" style={{ color: `${status.textColor}` }}>
        <Square2StackIcon className="mr-2 h-6 w-6" />
        <span className="text-xl font-medium">{status.statusName}</span>
      </div>
      {/* task list */}
      <div className="h-[calc(100%-40px)] overflow-y-auto">
        {taskList.map((item) => (
          <TaskItem key={item.id} task={item} />
        ))}
      </div>
    </div>
  );
};

export default TaskPanel;

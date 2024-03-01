"use client";
import React, { useCallback, useEffect, useState } from "react";

import { Button } from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import ControlledInput from "../form-field/controlled/ControlledInput";
import { taskFormSchema } from "@/utils/validation/task-form";
import ControlledTextarea from "../form-field/controlled/ControlledTexarea";
import { ControlledSelect } from "../form-field/controlled/ControlledSelect";
import { ControlledCombobox } from "../form-field/controlled/ControlledCombobox";
import { useGQLQuery } from "@/utils/hooks/useGQLQuery";
import { QUERY_ALL_STATUS, QUERY_ALL_TASKS, QUERY_ALL_USERS } from "@/utils/common/constants";
import { GET_ALL_STATUS } from "@/graphql/queries/getAllStatus";
import { GET_ALL_USERS } from "@/graphql/queries/getAllUsers";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useGQLMutation } from "@/utils/hooks/useGQLMutation";
import { ADD_TASK } from "@/graphql/mutations/addTask";
import { toast } from "react-toastify";

import { UPDATE_TASK } from "@/graphql/mutations/updateTask";
import { useQueryClient } from "@tanstack/react-query";
import { catchHandle } from "@/utils/common/catchHandle";

type Props = {
  onEdit?: boolean;
  handleCloseDialog: () => void;
  taskData?: any;
};

const TaskForm = ({ onEdit, handleCloseDialog, taskData }: Props) => {
  const queryClient = useQueryClient();
  const addTask = useGQLMutation(ADD_TASK);
  const updateTask = useGQLMutation(UPDATE_TASK);
  const [statusList, setStatusList] = useState<any[]>([]);
  const defaultAvtUrl = "/image/user-icon.png";
  const allStatus: any = useGQLQuery(QUERY_ALL_STATUS, GET_ALL_STATUS, {});

  const convertToStatusList = (data: any[]) => {
    const newDataList = data.map((item) => ({
      value: item.id,
      label: item.statusName,
    }));

    return newDataList;
  };

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
      status: statusList[0]?.value,
    },
    shouldFocusError: true,
  });

  useEffect(() => {
    if (onEdit) {
      form.reset({
        title: taskData?.taskTitle ? taskData?.taskTitle : "",
        description: taskData?.taskDescription ? taskData?.taskDescription : "",
        assignee: taskData?.assignUser?.id ? taskData?.assignUser?.id : "",
        status: taskData?.status?.id ? taskData.status?.id : statusList[0]?.value,
      });
    }
  }, [taskData]);

  useEffect(() => {
    if (allStatus.data?.statusList) {
      setStatusList(convertToStatusList(allStatus.data.statusList));
    }
  }, [allStatus.data]);

  // 2. Define a submit handler.
  function onSubmit(formValues: z.infer<typeof taskFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(formValues);

    const newTaskData = {
      newTaskData: {
        title: formValues.title,
        description: formValues.description,
        assignUserId: formValues.assignee ? Number(formValues.assignee) : null,
        statusId: formValues.status ? formValues.status : statusList[0]?.value,
      },
    };

    if (!onEdit) {
      addTask.mutate(newTaskData, {
        onSuccess: (res: any) => {
          console.log(res);
          form.reset();
          handleCloseDialog();
          toast.success("New task was added!");
          queryClient.invalidateQueries({ queryKey: [...QUERY_ALL_TASKS] });
        },
        onError: (err) => {
          catchHandle(err);
        },
      });
    } else {
      const payload = {
        updateTaskId: taskData?.id,
        updatedTaskData: {
          ...newTaskData.newTaskData,
        },
      };
      updateTask.mutate(payload, {
        onSuccess: (res: any) => {
          form.reset();
          handleCloseDialog();
          toast.success("Update task success");
          queryClient.invalidateQueries({ queryKey: [...QUERY_ALL_TASKS] });
        },
        onError: (err) => {
          catchHandle(err);
        },
      });
    }
  }

  const CustomOptions = useCallback(({ avtUrl, fullname, email, key }: any) => {
    return (
      <div className="my-1 flex min-h-[14px] w-fit cursor-pointer items-center gap-3" key={key}>
        <Avatar className="m-auto h-6 w-6">
          <AvatarImage src={avtUrl || defaultAvtUrl} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <div>
          <span className="block text-sm">{fullname}</span>
          <span className="text-xs text-gray-500">{`(${email})`}</span>
        </div>
      </div>
    );
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8" data-cy="task-form">
        <ControlledInput
          control={form.control}
          id="title"
          label="Title"
          name="title"
          placeholder="Enter task title"
          type="text"
        />

        <ControlledTextarea
          control={form.control}
          id="description"
          label="Description"
          name="description"
          placeholder="Enter task description"
        />

        <ControlledSelect
          control={form.control}
          dataList={statusList}
          defaultValue={onEdit ? taskData?.status.id : statusList[0]?.value}
          label="Status"
          name="status"
          data-cy="task-status"
        />

        <ControlledCombobox
          control={form.control}
          name="assignee"
          label="Assignee"
          placeholder="Select Assignee"
          onSelect={(value) => {
            form.setValue("assignee", value?.id);
          }}
          editMode={onEdit}
          editData={taskData?.assignUser}
          CustomOptionsItem={CustomOptions}
        />
        <Button type="submit" className="bg-blue-600 px-4 py-2 hover:bg-blue-700">
          {onEdit ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;

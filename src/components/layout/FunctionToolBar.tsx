"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import ModifyTaskPopup from "../popup/ModifyTaskPopup";

type Props = {};

const FunctionToolBar = (props: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <>
      <div className="mb-8 flex h-12 items-center justify-between">
        <p className="text-3xl font-medium text-neutral-700">Tasks</p>
        <div className="relative flex items-center gap-4">
          <Button
            data-cy="add-task-btn"
            className="bg-blue-600 px-4 py-2 hover:bg-blue-700"
            onClick={() => setIsShow(true)}
          >
            <PlusSmallIcon className="h-6 w-6" /> New Task
          </Button>
          <ModifyTaskPopup isShow={isShow} handleCloseDialog={() => setIsShow(false)} />
        </div>
      </div>
    </>
  );
};

export default FunctionToolBar;

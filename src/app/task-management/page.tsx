"use client";

import TaskContainer from "@/components/task-board/TaskContainer";
import SideBar from "@/components/layout/SideBar";
import FunctionToolBar from "@/components/layout/FunctionToolBar";
import { useIsFetching } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function TaskManagementPage() {
  const isFetching = useIsFetching();

  return (
    <div className="ml-[261px] flex h-full w-full dark:bg-[#20212c] ">
      {/* Sidebar */}
      <div className="fixed left-0 top-[65px] z-20 h-screen min-w-[261px] items-center border-r border-solid  bg-white dark:bg-[#2b2c37]">
        <div className="mx-auto my-16 h-full w-[200px]">
          <SideBar />
        </div>
      </div>

      <div className="mx-16 mt-28 flex-1">
        <>
          {/* Functional */}
          <FunctionToolBar />
          {/* Task board */}
          <div className="h-[calc(100vh-200px)]">
            <TaskContainer />
          </div>
        </>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowUturnLeftIcon, ListBulletIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import ModifyTaskPopup from "../popup/ModifyTaskPopup";
import { WindowIcon } from "@heroicons/react/24/outline";

type Props = {};

const SideBar = ({}: Props) => {
  return (
    <div className="flex h-[calc(100vh-180px)] flex-col gap-4">
      <Button className="w-full bg-blue-600 px-4 py-2 hover:bg-blue-700">
        <ListBulletIcon className="mr-2 h-6 w-6" /> Tasks
      </Button>
      <Button className="w-full bg-gray-300 px-4 py-2 text-black hover:bg-gray-500">
        <WindowIcon className="mr-2 h-6 w-6 text-black" /> Projects
      </Button>
      <Button
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
        className="mt-auto w-full bg-[#FDF0EC] px-4 py-2 text-[#81290E] hover:bg-[#ddc3bb]"
      >
        <ArrowUturnLeftIcon className="mr-2 h-6 w-6" /> Log out
      </Button>
    </div>
  );
};

export default SideBar;

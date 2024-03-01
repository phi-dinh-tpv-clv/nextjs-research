"use client";
import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UploadAvatarPopup from "../popup/UploadAvatarPopup";
import { useSession } from "next-auth/react";
import Logo from "@/assets/icons/logo";
import SearchBar from "../task-board/SearchBar";
import { DEFAULT_USER_IMAGE } from "@/utils/common/constants";

const Header = () => {
  const { data } = useSession();

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const handleCloseDialog = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="fixed left-0 right-0 z-50 bg-white">
        <header className="flex items-center justify-center">
          <div className="mt-7 flex min-w-[260px] cursor-pointer items-center justify-center gap-2">
            <Logo />
            <span className="text-3xl font-semibold text-blue-600">TaskBan</span>
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-20 border-b border-l border-solid">
            <SearchBar />
            <div className="group relative mr-10 h-11 w-11 cursor-pointer rounded-full bg-gray-300">
              <Avatar className="m-auto h-full w-full" onClick={() => setShowPopup(true)}>
                <AvatarImage src={data?.user?.avatar ?? DEFAULT_USER_IMAGE} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div
                className="absolute bottom-0 right-0 hidden h-4 w-4 rounded-full bg-gray-100 group-hover:flex"
                onClick={() => {
                  setShowPopup(true);
                }}
              >
                <PencilIcon className="m-auto block h-2 w-2" />
              </div>
            </div>
          </div>
        </header>
      </div>

      {showPopup && (
        <UploadAvatarPopup
          isShow={showPopup}
          currentAvatar={data?.user?.avatar ?? DEFAULT_USER_IMAGE}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </>
  );
};

export default Header;

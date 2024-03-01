import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import UploadAvatarForm from "../form/UploadAvatarForm";

type Props = {
  isShow: boolean;
  handleCloseDialog: () => void;
  currentAvatar: string;
};

const UploadAvatarPopup = ({ isShow, handleCloseDialog, currentAvatar }: Props) => {
  return (
    <Dialog open={isShow} onOpenChange={handleCloseDialog}>
      <DialogContent className="flex flex-col gap-10 sm:min-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Picture</DialogTitle>
          <DialogDescription>
            A profile picture helps others recognize you and also helps you identify that you have logged into your
            account
          </DialogDescription>
        </DialogHeader>
        <UploadAvatarForm currentImageUrl={currentAvatar} onClose={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadAvatarPopup;

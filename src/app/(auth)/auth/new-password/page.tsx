import NewPasswordForm from "@/components/form/NewPasswordForm";
import React from "react";

type Props = {};

const NewPasswordPage = (props: Props) => {
  return (
    <>
      <div className="my-8">
        <span className="text-2xl font-semibold">Create New Password</span>{" "}
      </div>
      <NewPasswordForm />
    </>
  );
};

export default NewPasswordPage;

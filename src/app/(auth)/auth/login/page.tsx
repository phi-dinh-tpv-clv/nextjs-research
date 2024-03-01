import React from "react";
import LoginForm from "@/components/form/LoginForm";
import Link from "next/link";
import { SIGN_UP_PAGE } from "@/config/route/page-routes";

const LoginPage = () => {
  return (
    <>
      <div className="mb-8" data-cy="login-page">
        <span className="text-3xl font-semibold">Welcome to</span>
        <span className="text-4xl font-semibold text-blue-600">TaskBan</span>
      </div>
      <LoginForm />
      <Link href={SIGN_UP_PAGE} className="my-3 flex justify-center gap-1">
        <span className="text-sm font-medium">Not registered yet?</span>
        <span className="text-sm font-medium text-blue-600">Create an account</span>
      </Link>
    </>
  );
};

export default LoginPage;

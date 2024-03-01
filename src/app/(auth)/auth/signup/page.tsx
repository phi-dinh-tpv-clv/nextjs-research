"use client";
import SignUpForm from "@/components/form/SignUpForm";
import { LOGIN_PAGE } from "@/config/route/page-routes";
import Link from "next/link";
import React from "react";

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <>
      <div className="my-8">
        <span className="text-2xl font-semibold">
          Get started with <span className="text-3xl font-semibold text-blue-600">TaskBan</span>
        </span>
      </div>
      <SignUpForm />
      <Link href={LOGIN_PAGE} className="my-3 flex justify-center">
        <span className="text-sm font-medium">
          Already have an account? <span className="text-sm font-medium text-blue-600">Sign In</span>
        </span>
      </Link>
    </>
  );
};

export default SignUpPage;

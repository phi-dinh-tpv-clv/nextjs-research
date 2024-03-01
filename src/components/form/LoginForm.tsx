"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import Link from "next/link";
import { Button } from "../ui/button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { signIn } from "next-auth/react";
import { CustomInput } from "../form-field/custom/CustomInput";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/utils/validation/login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledInput from "../form-field/controlled/ControlledInput";
import { RESET_PASSWORD_PAGE, TASK_MANAGEMENT_PAGE } from "@/config/route/page-routes";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);

  useEffect(() => {
    const notify = searchParams.get("success");
    if (notify == "true") {
      const msg = searchParams.get("message");
      toast(msg, { type: "success" });
    }
  }, []);

  useEffect(() => {
    if (isLoginSuccess) {
      router.push(TASK_MANAGEMENT_PAGE);
    }
  }, [isLoginSuccess]);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    shouldFocusError: true,
  });

  const handleIconClick = () => {
    setIsShowPassword(!isShowPassword);
  };

  async function onSubmit(formValues: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const signInResults = await signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      redirect: false,
    });
    if (signInResults?.error) {
      setIsLoginSuccess(false);
      toast.error("Username or Password is incorrect!");
    } else {
      setIsLoginSuccess(true);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <ControlledInput
          control={form.control}
          id="email"
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <ControlledInput
          control={form.control}
          id="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          type={!isShowPassword ? "password" : "text"}
          Icon={!isShowPassword ? EyeIcon : EyeSlashIcon}
          onIconClick={handleIconClick}
        />

        <Link href={RESET_PASSWORD_PAGE} className="-my-3 ml-auto text-sm font-medium text-blue-600">
          Forgot Password?
        </Link>
        <Button className="bg-blue-600 px-4 py-2 hover:bg-blue-700" type="submit" data-cy="login-btn">
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

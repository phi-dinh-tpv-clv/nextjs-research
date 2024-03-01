"use client";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import ControlledInput from "../form-field/controlled/ControlledInput";
import { signupFormSchema } from "@/utils/validation/signup-form";
import { REGISTER_USER } from "@/graphql/mutations/register";
import { useGQLMutation } from "@/utils/hooks/useGQLMutation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { LOGIN_PAGE } from "@/config/route/page-routes";
import { catchHandle } from "@/utils/common/catchHandle";

type Props = {};

const SignUpForm = (props: Props) => {
  const router = useRouter();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowRtPassword, setIsShowRtPassword] = useState<boolean>(false);
  const register = useGQLMutation(REGISTER_USER);

  const handleIconClick = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleRtIconClick = () => {
    setIsShowRtPassword(!isShowRtPassword);
  };

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirm: "",
    },
    shouldFocusError: true,
  });

  // 2. Define a submit handler.
  function onSubmit(formValues: z.infer<typeof signupFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    register.mutate(formValues, {
      onSuccess: (res: any) => {
        if (res.register.error) {
          toast.error(res.register.error.message);
        } else {
          form.reset();
          toast.success("Register successful");
          router.push(LOGIN_PAGE);
        }
      },
      onError: (err) => {
        catchHandle(err);
        form.setFocus("email");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <ControlledInput
          control={form.control}
          id="fullname"
          label="Full Name"
          name="fullname"
          placeholder="Enter your name"
          type="text"
        />

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
        <ControlledInput
          control={form.control}
          id="confirm"
          label="Confirm Password"
          name="confirm"
          placeholder="Confirm Password"
          type={!isShowRtPassword ? "password" : "text"}
          Icon={!isShowRtPassword ? EyeIcon : EyeSlashIcon}
          onIconClick={handleRtIconClick}
        />
        <Button type="submit" className="bg-blue-600 px-4 py-2 hover:bg-blue-700">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;

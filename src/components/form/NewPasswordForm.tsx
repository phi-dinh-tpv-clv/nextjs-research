"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { UPDATE_PASSWORD } from "@/graphql/mutations/resetPassword";
import { useGQLMutation } from "@/utils/hooks/useGQLMutation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { newPasswordSchema } from "@/utils/validation/new-password-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LOGIN_PAGE } from "@/config/route/page-routes";
import { Form } from "../ui/form";
import ControlledInput from "../form-field/controlled/ControlledInput";
import Link from "next/link";
import { catchHandle } from "@/utils/common/catchHandle";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowRtPassword, setIsShowRtPassword] = useState<boolean>(false);
  const { mutate } = useGQLMutation(UPDATE_PASSWORD);

  useEffect(() => {
    if (!searchParams.get("token")) {
      redirect(LOGIN_PAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
    shouldFocusError: true,
  });

  async function onSubmit(formValues: z.infer<typeof newPasswordSchema>) {
    const payload = {
      password: formValues.password,
      token: searchParams.get("token"),
    };

    mutate(payload, {
      onSuccess: (res: any) => {
        console.log("success", res);
        push("/auth/login?success=true&message=" + res.updatePassword.message);
      },
      onError: (err: any) => {
        console.log("error", err);
        catchHandle(err);
      },
    });
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <ControlledInput
          control={form.control}
          id="password"
          label="Password"
          name="password"
          placeholder="Enter your password"
          type={!isShowPassword ? "password" : "text"}
          Icon={!isShowPassword ? EyeIcon : EyeSlashIcon}
          onIconClick={() => setIsShowPassword(!isShowPassword)}
          classNameIcon="cursor-pointer"
        />
        <ControlledInput
          control={form.control}
          id="confirm"
          label="Confirm Password"
          name="confirm"
          placeholder="Confirm Password"
          type={!isShowRtPassword ? "password" : "text"}
          Icon={!isShowRtPassword ? EyeIcon : EyeSlashIcon}
          onIconClick={() => setIsShowRtPassword(!isShowRtPassword)}
          classNameIcon="cursor-pointer"
        />

        <Button className="bg-blue-600 px-4 py-2 hover:bg-blue-700">Change Password</Button>
      </form>

      <Link href={LOGIN_PAGE} className="my-3 flex justify-center">
        <span className="text-sm font-medium text-blue-600">Back to Sign In</span>
      </Link>
    </Form>
  );
};

export default NewPasswordForm;

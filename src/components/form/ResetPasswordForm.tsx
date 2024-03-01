"use client";

import React from "react";
import * as z from "zod";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGQLMutation } from "@/utils/hooks/useGQLMutation";
import { FORGOT_PASSWORD } from "@/graphql/mutations/forgotPassword";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ControlledInput from "../form-field/controlled/ControlledInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/utils/validation/reset-password-form";
import { Form } from "../ui/form";
import { catchHandle } from "@/utils/common/catchHandle";

const ResetPasswordForm = () => {
  const { push } = useRouter();
  const { mutate } = useGQLMutation(FORGOT_PASSWORD);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
    shouldFocusError: true,
  });

  async function onSubmit(formValues: z.infer<typeof resetPasswordSchema>) {
    mutate(
      { email: formValues.email },
      {
        onSuccess: (res: any) => {
          push("/auth/login?success=true&message=" + res.forgotPassword.message);
        },
        onError: (err: any) => {
          console.log("res", err);
          catchHandle(err);
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <ControlledInput
          control={form.control}
          id="email"
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <Button type="submit" className="bg-blue-600 px-4 py-2 hover:bg-blue-700">
          Reset Password
        </Button>
      </form>

      <Link href="/auth/login" className="my-3 flex justify-center">
        <span className="text-sm font-medium text-blue-600">Back to Sign In</span>
      </Link>
    </Form>
  );
};

export default ResetPasswordForm;

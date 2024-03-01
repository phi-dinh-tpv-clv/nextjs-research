import React, { ChangeEvent, useState } from "react";
import { Form } from "../ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import ControlledInput from "../form-field/controlled/ControlledInput";
import * as z from "zod";
import { uploadAvatarSchema } from "@/utils/validation/upload-avatar-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { uploadAvatarFormData } from "@/graphql/mutations/updateAvatar";
import baseApi from "@/utils/api/baseApi";
import { toast } from "react-toastify";

type Props = {
  currentImageUrl: string;
  onClose: () => void;
};

const UploadAvatarForm = ({ currentImageUrl, onClose }: Props) => {
  const [preview, setPreview] = useState(currentImageUrl);
  const { data, update } = useSession();

  function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();
    Array.from(event.target.files!).forEach((image) => dataTransfer.items.add(image));

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
  }

  const form = useForm<z.infer<typeof uploadAvatarSchema>>({
    resolver: zodResolver(uploadAvatarSchema),
    defaultValues: {
      avatar: "",
      image: "",
    },
    shouldFocusError: true,
  });

  async function onSubmit(formValues: z.infer<typeof uploadAvatarSchema>) {
    if (!data?.user.id) {
      toast("Something went wrong", { type: "error" });
      return;
    }

    const payload = {
      userId: data?.user.id,
      avatar: formValues.avatar?.[0] as File,
    };

    baseApi({
      data: uploadAvatarFormData(payload),
      token: [data.tokens.type, data.tokens.token].join(" "),
      onSuccess: ({ data }) => {
        update({
          user: data.data.uploadAvatar,
        });
        onClose();
      },
      onError: (error) => {
        console.error("API call error:", error);
      },
    });
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="relative mx-auto h-48 w-48">
          <Avatar className="m-auto h-full w-full">
            <AvatarImage src={preview} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <ControlledInput
          control={form.control}
          id="image"
          label="Change picture"
          name="image"
          type="file"
          onChange={(event) => {
            const { files, displayUrl } = getImageData(event);
            setPreview(displayUrl);
            form.setValue("avatar", files);
          }}
          className="w-full"
        />

        <div className=" flex">
          <div className="ml-auto flex gap-3">
            <Button type="button" variant="destructive" onClick={onClose}>
              Cancel changes
            </Button>
            <Button type="submit">Save changes</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UploadAvatarForm;

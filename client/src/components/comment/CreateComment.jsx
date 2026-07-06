import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Avatar, Button, Textarea, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AppButton from "../shared/AppButton";
import { customTheme } from "../../lib/flowbiteTheme";
import { useAuth } from "../../hooks/useAuth";
import { RiSendPlaneFill } from "react-icons/ri";
import { AxiosInstance } from "../../services/api";
import { useCreateComment } from "../../hooks/mutations/post/useCreateComment";

export default function CreateComment({ postId }) {
  const { userData } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();

  const { mutate } = useCreateComment(postId);
  const onSubmit = (data) => mutate(data);

  return (
    <div className="border-t border-neutral-600 pt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-4 items-center"
      >
        <Avatar
          alt="User settings"
          img={
            userData?.photo ||
            "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          }
          rounded
        />
        <div className="relative w-full">
          <TextInput
            id="content"
            color="dark"
            theme={customTheme.textInput}
            type="text"
            placeholder="Leave a comment..."
            className=""
            {...register("content", { required: true })}
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-yellow-300 hover:scale-110 duration-300 p-1 dark:bg-transparent dark:hover:bg-transparent focus:ring-0"
          >
            <RiSendPlaneFill size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
}

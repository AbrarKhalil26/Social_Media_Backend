import { Label, TextInput } from "flowbite-react";
import AppButton from "../shared/AppButton";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../shared/ValidationError";

const defaultValues = {
  password: "",
  newPassword: "",
};
const schema = z.object({
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

export default function ChangePassword({ setOpenChangePassModal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { mutate: handleChangePassword, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success(`Password changed successfully, Please Login again.`, {
        theme: "dark",
        autoClose: 2000,
      });

      queryClient.invalidateQueries(["details-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
      queryClient.invalidateQueries(["user-data"]);
      setOpenChangePassModal(false);
      reset();
    },
    onError: () => {
      toast.error(`Something went wrong`, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });

  async function changePassword(data) {
    return await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/users/change-password`,
      data,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleChangePassword)}
      className="flex flex-col gap-5"
    >
      <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
        Change password
      </h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Your Password</Label>
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="*******"
          {...register("password", { required: true })}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="newPassword">New Password</Label>
        </div>
        <TextInput
          id="newPassword"
          type="password"
          placeholder="*******"
          {...register("newPassword", { required: true })}
        />
      </div>
      <ValidationError
        checked={errors.password}
        error={errors?.password?.message || 'incorrect email or password'}
      />
      <div className="flex gap-4 justify-center">
        <AppButton
          isLoading={isPending}
          disabled={!isValid || isPending}
          type="submit"
          className="w-1/2 cursor-pointer"
        >
          Update
        </AppButton>
        <AppButton
          type="submit"
          color=""
          className="w-1/2 border cursor-pointer text-gray-300 hover:bg-gray-800/30"
          onClick={() => setOpenChangePassModal(false)}
        >
          Cancel
        </AppButton>
      </div>
    </form>
  );
}

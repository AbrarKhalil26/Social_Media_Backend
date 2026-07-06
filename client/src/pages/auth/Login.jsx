import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Checkbox, Label, TextInput } from "flowbite-react";
import ValidationError from "../../components/shared/ValidationError";
import { HiInformationCircle } from "react-icons/hi";
import AppButton from "../../components/shared/AppButton";
import { Helmet } from "react-helmet-async";
import ImageLogin from "../../assets/images/Mobile life-cuate.svg";
import { useLogin } from "../../hooks/mutations/useLogin";
import { useAuth } from "../../hooks/useAuth";

const defaultValues = { email: "", password: "", rememberMe: false };

const schema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
  rememberMe: z.boolean().default(false),
});

export default function Login() {
  const { setToken } = useAuth;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useLogin({ reset });
  const onSubmit = (data) => mutate(data);

  return (
    <>
      <Helmet>
        <title>Kudo | Login</title>
      </Helmet>
      <section>
        <div className="container grid md:grid-cols-2 items-center">
          <img src={ImageLogin} className="w-full order-1 hidden md:block" />
          <div className="w-full mx-auto py-8 rounded">
            <div className=" mb-10">
              <h2 className="text-center mb-3 text-3xl lg:text-5xl">Login</h2>
              <p className="text-sm text-center text-zinc-400">
                Enter your details below
              </p>
            </div>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* ------------------Email----------------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email">Your email</Label>
                </div>
                <TextInput
                  id="email"
                  type="text"
                  placeholder="name@flowbite.com"
                  color="default"
                  {...register("email")}
                />
                <ValidationError
                  checked={errors.email}
                  error={errors?.email?.message}
                />
              </div>

              {/* ------------------password----------------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password">Your password</Label>
                </div>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="********"
                  color="default"
                  {...register("password")}
                />
                <ValidationError
                  checked={errors.password}
                  error={errors?.password?.message}
                />
              </div>
              <div className="flex flex-wrap gap-3 justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember-password"
                    className="text-yellow-500 focus:ring-yellow-500 dark:focus:ring-yellow-500"
                    {...register("rememberMe")}
                  />
                  <Label htmlFor="remember-password">Remember Me</Label>
                </div>
                <NavLink
                  to="/auth/forget-password"
                  className="text-sm text-yellow-400 hover:underline w-fit duration-300"
                >
                  Forget Password
                </NavLink>
              </div>
              <AppButton
                type="submit"
                isLoading={isSubmitting}
                className="btn-yellow w-full"
              >
                Login
              </AppButton>
            </form>
            <p className="text-center text-sm mt-4">
              Do not have an account?{" "}
              <NavLink to="/auth/register" className="text-yellow-400">
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

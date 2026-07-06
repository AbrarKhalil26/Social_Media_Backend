import * as z from "zod";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import ImageForgetPass from "../../assets/images/Forgot password-rafiki.svg";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiInformationCircle } from "react-icons/hi";
import InputField from "../../components/shared/InputField";
import AppButton from "../../components/shared/AppButton";
import { IoIosArrowBack } from "react-icons/io";
import { useForgetPassword } from "../../hooks/mutations/useForgetPassword";

const ForgetPassSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(ForgetPassSchema),
  });

  const { mutate, isPending } = useForgetPassword();
  const onSubmit = (data) => mutate(data);

  return (
    <>
      <Helmet>
        <title>Kudo | Forget Password</title>
      </Helmet>
      <section>
        <div className="container grid md:grid-cols-2 items-center">
          <img src={ImageForgetPass} className="w-full hidden md:block" />
          <div className="w-full mx-auto lg:px-10 py-8 rounded">
            <div className=" mb-5">
              <h2 className="text-center mb-2 text-3xl">Forget Password</h2>{" "}
              <p className="text-sm text-center text-zinc-400">
                No worries, we will send you reset instructions.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* ------------------Email----------------- */}
              <InputField
                register={register}
                errors={errors}
                id="email"
                placeholder="name@flowbite.com"
              >
                Your email
              </InputField>

              <AppButton
                type="submit"
                isLoading={isSubmitting}
                disabled={!isValid}
                className="btn-yellow w-full"
              >
                Forget Password
              </AppButton>
            </form>
            <NavLink
              to="/auth/login"
              className="text-yellow-400 no-underline text-center text-sm flex items-center gap-2 mt-5"
            >
              <IoIosArrowBack /> Back to login
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}

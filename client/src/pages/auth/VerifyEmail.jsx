import React, { useEffect, useState } from "react";
import * as z from "zod";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import ImageVerify from "../../assets/images/Authentication-pana.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import InputOTP from "../../components/shared/InputOTP";
import AppButton from "../../components/shared/AppButton";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiInformationCircle } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { formatTime } from "../../lib/formateDate";
import CountdownTimer from "../../components/shared/CountdownTimer";
import {
  useSendOtp,
  useVerifyEmail,
} from "../../hooks/mutations/useVerifyEmail";

const VerifySchema = z.object({
  otp: z
    .string({message: "Otp is required"})
    .length(6, { message: "OTP must be 6 digits" })
    .regex(/^\d+$/, { message: "OTP must be numbers only" }),
});

export default function VerifyEmail() {
  const navigate = useNavigate();
  const store = JSON.parse(sessionStorage.getItem("verificationData"));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: { otp: "" },
    resolver: zodResolver(VerifySchema),
  });

  const { mutate: verifyEmail, isPending } = useVerifyEmail();
  const onSubmit = (data) => verifyEmail(data);

  const { mutate: sendOtp, isPending: isPendingResend } = useSendOtp();
  const handleResendOtp = (data) => sendOtp(data);

  return (
    <>
      <Helmet>
        <title>Kudo | Register</title>
      </Helmet>
      <section className="pt-5 pb-12">
        <div className="container grid md:grid-cols-2 items-center">
          <img src={ImageVerify} className="w-full order-1 hidden md:block" />
          <div className="w-full mx-auto lg:px-10 py-8 rounded">
            <div className=" mb-5">
              <h2 className="text-center mb-4 text-3xl">Verify Email</h2>{" "}
              <p className="text-sm text-center text-gray-600 mb-5 flex flex-wrap items-center justify-center">
                We sent a 6-digit code to{" "}
                <span className="ml-3 border rounded-sm px-2 flex items-center gap-2 py-1">
                  <MdOutlineMailOutline />
                  {store?.email}
                </span>
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <InputOTP control={control} />
              <AppButton
                type="submit"
                isLoading={isSubmitting}
                disabled={!isValid}
                className="btn-yellow w-full"
              >
                Verify Email
              </AppButton>
            </form>

            <div className="flex items-center mt-5">
              <NavLink
                to={"/auth/register"}
                className="text-yellow-400 no-underline"
              >
                <p className="text-center text-sm flex items-center gap-2">
                  <IoIosArrowBack /> Back to register
                </p>
              </NavLink>
              <div className="ml-auto">
                <CountdownTimer
                  onExpire={() => {}}
                  fallback={
                    <AppButton
                      type="button"
                      isLoading={isSubmitting}
                      onClick={handleResendOtp}
                      className="bg-neutral-800! border border-yellow-400 ring-transparent!"
                    >
                      Resend OTP
                    </AppButton>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

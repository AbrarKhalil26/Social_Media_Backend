import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import ImageResetPass from "../../assets/images/Reset password-amico.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiInformationCircle } from "react-icons/hi";
import InputField from "../../components/shared/InputField";
import AppButton from "../../components/shared/AppButton";
import { IoIosArrowBack } from "react-icons/io";
import {
  ResetPassDefaultValues,
  ResetPasswordSchema,
} from "../../schema/reset.schema";
import InputOTP from "../../components/shared/InputOTP";
import CountdownTimer from "../../components/shared/CountdownTimer";
import { useResetPassword } from "../../hooks/mutations/useResetPassword";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: ResetPassDefaultValues,
    resolver: zodResolver(ResetPasswordSchema),
  });
  const { mutate, isPending } = useResetPassword();
  const onSubmit = (data) => mutate(data);

  return (
    <>
      <Helmet>
        <title>Kudo | Forget Password</title>
      </Helmet>
      <section>
        <div className="container grid md:grid-cols-2 md:gap-5 items-center">
          <img src={ImageResetPass} className="w-full hidden md:block" />
          <div className="w-full mx-auto lg:px-10 py-8 rounded">
            <div className=" mb-5">
              <h2 className="text-center mb-2 text-3xl">Reset Password</h2>{" "}
              <p className="text-sm text-center text-zinc-400">
                Enter the OTP sent to your email and choose a new password.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <InputOTP control={control} />
              <div className="ml-auto">
                <CountdownTimer onExpire={() => {}} fallback={null} />
              </div>
              <InputField
                register={register}
                errors={errors}
                id="password"
                placeholder="********"
                type="password"
              >
                Your password
              </InputField>
              <InputField
                register={register}
                errors={errors}
                id="cPassword"
                placeholder="********"
                type="password"
              >
                Confirm Password
              </InputField>

              <AppButton
                type="submit"
                isLoading={isSubmitting}
                className="btn-yellow w-full"
              >
                Reset Password
              </AppButton>
            </form>
            <NavLink
              href="/auth/login"
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

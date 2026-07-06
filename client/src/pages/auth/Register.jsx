import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import ValidationError from "../../components/shared/ValidationError";
import AppButton from "../../components/shared/AppButton";
import ImageRegister from "../../assets/images/Social tree-rafiki.svg";
import {
  RegisterSchema,
  RegisterDefaultValues,
} from "../../schema/register.schema";
import { calculateAge } from "../../lib/formateDate";
import InputField from "../../components/shared/InputField";
import { CiLock } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { useRegister } from "../../hooks/mutations/useRegister";

export const registerFieldGroups = [
  {
    groupKey: "name",
    fields: [
      { id: "firstName", label: "First Name", placeholder: "Abrar" },
      { id: "lastName", label: "Last Name", placeholder: "Khalil" },
    ],
  },
  {
    groupKey: "email",
    fields: [
      {
        id: "email",
        label: "Your email",
        placeholder: "name@flowbite.com",
        icon: MdOutlineEmail,
      },
    ],
  },
  {
    groupKey: "password",
    fields: [
      {
        id: "password",
        label: "Your password",
        placeholder: "********",
        type: "password",
        icon: CiLock,
      },
      {
        id: "cPassword",
        label: "Confirm Password",
        placeholder: "********",
        type: "password",
        icon: CiLock,
      },
    ],
  },
  {
    groupKey: "contact",
    fields: [
      {
        id: "phone",
        label: "Phone",
        placeholder: "+201234567890",
        icon: MdOutlineLocalPhone,
      },
      {
        id: "address",
        label: "Address",
        placeholder: "Ismailia, Egypt",
        icon: IoLocationOutline,
      },
    ],
  },
  {
    groupKey: "dateOfBirth",
    fields: [{ id: "dateOfBirth", label: "Date of Birth", state: "DOB" }],
  },
  {
    groupKey: "gender",
    fields: [{ id: "gender", label: "Gender:", state: "gender" }],
  },
];

export default function Register() {
  const form = useForm({
    defaultValues: RegisterDefaultValues,
    resolver: zodResolver(RegisterSchema),
  });

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, dirtyFields },
  } = form;

  const { mutate, isPending } = useRegister({ reset });

  const onSubmit = (data) => {
    if (dirtyFields.dateOfBirth) {
      const age = calculateAge(data.dateOfBirth);
      mutate({ ...data, age });
    } else mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Kudo | Register</title>
      </Helmet>
      <section className="pt-5 pb-12">
        <div className="container grid md:grid-cols-2 md:gap-5 items-center">
          <img src={ImageRegister} className="w-full order-1 hidden md:block" />
          <div className="w-full mx-auto py-8 rounded">
            <div className="text-center mb-5">
              <h2 className="mb-2 text-3xl">Create your account</h2>{" "}
              <p className="text-sm text-zinc-400">
                Fill in your details to get started.
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {registerFieldGroups.map((group) => (
                <div
                  key={group.groupKey}
                  className={
                    group.fields.length > 1
                      ? "grid md:grid-cols-2 gap-4"
                      : group.groupKey === "gender"
                        ? "flex flex-wrap items-center gap-5"
                        : ""
                  }
                >
                  {group.fields.map((field) => (
                    <InputField
                      key={field.id}
                      register={register}
                      errors={errors}
                      control={control}
                      id={field.id}
                      state={field.state}
                      type={field.type}
                      placeholder={field.placeholder}
                      icon={field.icon}
                    >
                      {field.label}
                    </InputField>
                  ))}
                </div>
              ))}

              <AppButton
                type="submit"
                isLoading={isPending}
                disabled={!isValid}
                className="btn-yellow w-full"
              >
                Register
              </AppButton>
            </form>
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <NavLink to="/auth/login" className="text-yellow-400">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

import { Datepicker, Label, Radio, TextInput } from "flowbite-react";
import React from "react";
import ValidationError from "./ValidationError";
import { customTheme } from "../../lib/flowbiteTheme";
import { Controller } from "react-hook-form";

export default function InputField({
  register,
  errors,
  children,
  id,
  state,
  control,
  ...props
}) {
  return (
    <div className={`${state === "gender" ? "flex gap-6 items-center" : ""}`}>
      <div className="mb-2 ">
        <Label htmlFor={id} className="text-neutral-300!">
          {children}
        </Label>
      </div>
      {state === "gender" ? (
        <div className="flex gap-14">
          <div className="flex items-center gap-2">
            <Radio
              id="female"
              name="gender"
              value="female"
              {...register("gender")}
              className="text-yellow-500 ring-neutral-800 focus:ring-yellow-500 dark:focus:ring-yellow-500"
            />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="male"
              name="gender"
              value="male"
              defaultChecked
              {...register("gender")}
              className="text-yellow-500 focus:ring-yellow-500 dark:focus:ring-yellow-500"
              color="default"
            />
            <Label htmlFor="male">Male</Label>
          </div>
        </div>
      ) : state === "DOB" ? (
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div>
              <Datepicker
                id="dateOfBirth"
                className="date-input"
                onChange={onChange}
                selected={value}
                className="[&_input]:bg-[#2e2e2e] [&_input]:text-white  [&_input]:hover:bg-[#363636] [&_input]:focus:bg-[#363636] [&_input]:focus:border-amber-400 [&_input]:focus:ring-amber-400 [&_input]:border-none [&_input]:duration-300"
              />
            </div>
          )}
        />
      ) : (
        <TextInput
          {...props}
          id={id}
          color="dark"
          {...register(id)}
          theme={customTheme.textInput}
        />
      )}

      <ValidationError checked={errors.id} error={errors?.id?.message} />
    </div>
  );
}

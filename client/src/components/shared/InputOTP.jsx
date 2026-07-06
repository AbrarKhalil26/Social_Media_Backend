import React, { useEffect, useRef } from "react";
import { OTPInput } from "input-otp";
import { Controller } from "react-hook-form";
import { Label } from "flowbite-react";

export default function InputOTP({ control }) {
  const otpRef = useRef(null);

  useEffect(() => {
    otpRef.current?.querySelector("input")?.focus();
  }, []);

  return (
    <Controller
      name="otp"
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <Label htmlFor="otp-input" className="text-base">Enter OTP:</Label>
          <div ref={otpRef}>
            <OTPInput
              id="otp-input"
              maxLength={6}
              inputMode="numeric"
              pattern="\d*"
              value={field.value}
              onChange={field.onChange}
              onKeyDown={(e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  ![
                    "Backspace",
                    "Delete",
                    "ArrowLeft",
                    "ArrowRight",
                    "Tab",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
              }}
              render={({ slots }) => (
                <div className="flex gap-2 mt-3">
                  {slots.map((slot, i) => (
                    <div
                      key={i}
                      className={`w-full h-12 border rounded-lg flex items-center justify-center text-lg font-medium transition-all
          ${
            slot.isActive
              ? "border-yellow-400 ring-1 ring-yellow-400"
              : "border-gray-600"
          }`}
                    >
                      {slot.char ?? ""}
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
          {fieldState.error && (
            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}

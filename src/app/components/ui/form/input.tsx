"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: "underlined" | "outlined";
  error?: string;
}

export const Input: React.FC<InputFieldProps> = ({
  label,
  id,
  variant = "outlined",
  className,
  error,
  ...props
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  const base =
    "font-body placeholder-gray-1 text-[14px] px-2 py-2 transition-colors duration-150 ease-in-out";

  const variants = {
    underlined:
      "border-b border-gray-1 focus:border-primary focus:outline-none text-gray-2",
    outlined:
      "bg-white-3 rounded-[6px] focus:border-1 focus:border-primary focus:outline-none text-gray-2",
  };

  const errorVariant =
    variant === "underlined"
      ? "border-b border-red-2 focus:border-red-2 text-red-2 focus:outline-none"
      : "focus:border-1 focus:border-red-2 text-red-2 bg-white-3 rounded-[6px] focus:outline-none";

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={inputId}
        className={`font-body text-[14px] font-[500] + ${
          error ? "text-red-2" : "text-black-2"
        }`}
      >
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        className={cn(
          base,
          error ? errorVariant : variants[variant],
          className
        )}
      />
      <div className="h-[14px] mt-1">
        {error && (
          <p className="text-red-2 text-[12px] font-body leading-[1.2]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: "underlined" | "outlined";
}

export const Input: React.FC<InputFieldProps> = ({
  label,
  id,
  variant = "outlined",
  className,
  ...props
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  const base = "font-body placeholder-gray-1 text-[14px] px-2 py-1";

  const variants = {
    underlined:
      "border-b border-gray-1 focus:border-primary focus:outline-none text-gray-2",
    outlined:
      "bg-white-3 rounded-[6px] focus:border-1 focus:border-primary focus:outline-none text-gray-2",
  };

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={inputId}
        className="font-body text-[14px] font-[500] text-black-2"
      >
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        className={cn(base, variants[variant], className)}
      />
    </div>
  );
};

"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  block?: boolean;
}

export function Button({
  children,
  variant = "primary",
  block = false,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md font-body font-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variants = {
    primary: "bg-primary text-white hover:bg-indigo-600 focus:ring-indigo-500",
    secondary:
      "bg-white-2 text-primary hover:brightness-90 focus:ring-brightness-95",
    danger: "text-red-2",
  };

  return (
    <button
      className={cn(
        base,
        variants[variant],
        block ? "w-full" : "",
        "px-4 py-2 font-[14px]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

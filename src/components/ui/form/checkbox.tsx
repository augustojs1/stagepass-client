"use client";

import React from "react";

import { cn } from "@/lib/utils";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  direction?: "vertical" | "horizontal";
  name?: string;
  className?: string;
};

const Checkbox = ({
  label,
  checked,
  onChange,
  direction = "vertical",
  name,
  className,
}: CheckboxProps) => {
  return (
    <div
      className={cn(
        "inline-flex",
        direction === "vertical"
          ? "flex-col space-y-2"
          : "flex-row flex-wrap gap-4",
        className
      )}
    >
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer hidden"
        />

        <span
          className={cn(
            "w-5 h-5 flex items-center justify-center border rounded transition-all",
            checked ? "bg-primary border-primary" : "bg-white border-gray-300"
          )}
        >
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>

        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;

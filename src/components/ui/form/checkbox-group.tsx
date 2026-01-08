"use client";

import React from "react";

import { cn } from "@/lib/utils";

type Option = {
  value: string;
  label?: string;
  children?: React.ReactNode;
};

type CheckboxGroupProps = {
  options: Option[];
  value: string[];
  setValue: (newValue: string[]) => void;
  direction?: "vertical" | "horizontal";
  name?: string;
  className?: string;
};

const CheckboxGroup = ({
  options,
  value,
  setValue,
  direction = "vertical",
  name,
  className,
}: CheckboxGroupProps) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked, value: optionValue } = e.target;

    if (checked) {
      setValue([...value, optionValue]);
    } else {
      setValue(value.filter((item) => item !== optionValue));
    }
  }

  return (
    <div
      className={cn(
        "flex",
        direction === "vertical"
          ? "flex-col space-y-2"
          : "flex-row flex-wrap gap-4",
        className
      )}
    >
      {options.map((option) => {
        const isChecked = value.includes(option.value);

        return (
          <label
            key={option.value}
            className={cn(
              "flex items-center gap-2 cursor-pointer select-none",
              "text-gray-700 hover:text-black transition-colors"
            )}
          >
            <input
              type="checkbox"
              className="peer hidden"
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={handleChange}
            />

            <span
              className={cn(
                "w-5 h-5 flex items-center justify-center border rounded transition-all",
                "peer-focus:ring-2 peer-focus:ring-primary/50",
                isChecked
                  ? "bg-primary border-primary"
                  : "bg-white border-gray-300"
              )}
            >
              {isChecked && (
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

            <span>{option.children ? option.children : option.label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;

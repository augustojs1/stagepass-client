"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Select({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

  return (
    <div className="flex flex-col w-full relative">
      {label && (
        <label className="text-[14px] font-medium text-gray-800 mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full bg-gray-100 rounded-[8px] px-2 py-2 text-left flex justify-between items-center text-[14px] text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      >
        <span className={selectedLabel ? "text-gray-800" : "text-gray-2"}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDown className="w-5 h-5 text-gray-2" />
      </button>
      {isOpen && (
        <ul className="absolute top-full mt-1 w-full bg-white-3 border border-gray-200 rounded-md shadow-md z-10 max-h-48 overflow-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-[14px] text-gray-2 cursor-pointer hover:bg-white-2 hover:text-primary  ${
                value === option.value ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

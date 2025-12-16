"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  error?: string;
}

export function Select({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
  error,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const base =
    "w-full font-body text-[14px] px-2 py-2 rounded-[8px] flex justify-between items-center transition-colors duration-150 ease-in-out focus:outline-none focus:ring-1";

  const variants = {
    default: "bg-white-3 text-gray-2 focus:ring-primary",
  };

  const errorVariant =
    "bg-red-50 border border-red-2 text-red-2 focus:ring-red-2";

  return (
    <div ref={containerRef} className="flex flex-col w-full relative">
      {label && (
        <label
          className={cn(
            "font-body text-[14px] font-[500] mb-1",
            error ? "text-red-2" : "text-gray-2"
          )}
        >
          {label}
        </label>
      )}

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(base, error ? errorVariant : variants.default, className)}
      >
        <span className={cn(selectedLabel ? "text-gray-2" : "text-gray-2")}>
          {selectedLabel || placeholder}
        </span>

        <ChevronDown
          className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute top-full mt-1 w-full bg-white-3 border border-gray-200 rounded-md shadow-md z-10 max-h-48 overflow-auto text-gray-2"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange?.(option.value);
                setIsOpen(false);
              }}
              className={cn(
                "px-4 py-2 text-[14px] cursor-pointer hover:bg-white-2 hover:text-primary",
                value === option.value && "bg-gray-50 font-medium text-primary"
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      <div className="h-[14px] mt-1">
        {error && <p className="text-red-2 text-[12px] font-body">{error}</p>}
      </div>
    </div>
  );
}

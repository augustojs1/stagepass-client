"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface DropdownProps {
  trigger: React.ReactNode;
  items: { label: string; onClick?: () => void; href?: string }[];
  align?: "left" | "right";
}

export function Dropdown({ trigger, items, align = "right" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative select-none" ref={ref}>
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>
      <div
        className={`absolute mt-2 min-w-[160px] rounded-lg bg-white shadow-lg border border-gray-100 z-50 transform transition-all duration-200 ease-out origin-top ${
          align === "right" ? "right-0" : "left-0"
        } ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={item.onClick}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

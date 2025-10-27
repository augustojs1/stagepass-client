"use client";

import { X } from "lucide-react";

type ErrorBadgeProps = {
  message: string | null;
  showErrorBadge: () => void;
};

export function ErrorBadge({ message, showErrorBadge }: ErrorBadgeProps) {
  return (
    <div className="border-1 border-red-1 rounded-[6px] bg-red-4 px-5 py-2 flex justify-between items-center">
      <p className="text-black-1">{message}</p>
      <button className="cursor-pointer p-1" onClick={showErrorBadge}>
        <X size={20} color="#e8618c" />
      </button>
    </div>
  );
}

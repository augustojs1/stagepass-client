"use client";

import { X } from "lucide-react";

type ErrorBadgeProps = {
  message: string | null;
  showErrorBadge: () => void;
};

export function ErrorBadge({ message, showErrorBadge }: ErrorBadgeProps) {
  const handleCloseBadge = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    showErrorBadge();
  };

  return (
    <div className="border-1 border-red-1 rounded-[6px] bg-red-4 px-5 py-2 flex justify-between items-center">
      <p className="text-5 font-normal text-gray-3">{message}</p>
      <button className="cursor-pointer p-1" onClick={handleCloseBadge}>
        <X size={20} color="#e8618c" />
      </button>
    </div>
  );
}

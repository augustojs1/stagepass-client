"use client";

import React from "react";

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const TextArea: React.FC<TextAreaFieldProps> = ({ id, ...props }) => {
  const inputId = id;

  return (
    <textarea
      id={inputId}
      className="bg-white-3 rounded-[6px] w-full focus:border-primary focus:outline-none p-2 placeholder-gray-1 text-[14px] text-gray-2"
      {...props}
    ></textarea>
  );
};

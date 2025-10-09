import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputFieldProps> = ({ label, id, ...props }) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={inputId}
        className="font-body text-[14px] font-[500] text-black-3 mb-1"
      >
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        className="font-body border-b  border-gray-1 focus:border-primary focus:outline-none py-1 placeholder-gray-1 text-[14px] text-gray-2"
      />
    </div>
  );
};

import { ChangeEvent } from "react";

interface InputProps {
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Input({
  type = "text",
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    />
  );
}
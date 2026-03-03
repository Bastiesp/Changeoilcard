import React from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", children, className, ...props }) => {
  let base = "px-4 py-2 rounded font-semibold text-white ";
  let color = "";

  switch (variant) {
    case "primary":
      color = "bg-blue-600 hover:bg-blue-700";
      break;
    case "secondary":
      color = "bg-gray-500 hover:bg-gray-600";
      break;
    case "danger":
      color = "bg-red-500 hover:bg-red-600";
      break;
  }

  return (
    <button className={`${base} ${color} ${className || ""}`} {...props}>
      {children}
    </button>
  );
};

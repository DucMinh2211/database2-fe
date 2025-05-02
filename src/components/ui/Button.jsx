import React from "react";

export default function Button({ className = '', variant = "primary", disabled = false, children, ...props }) {
const variantClasses = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
}
  return (
      <button
        className={`px-4 py-2 rounded-md font-medium transition-colors ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed': ''}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }

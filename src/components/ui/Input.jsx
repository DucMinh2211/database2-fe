import React from "react"

export default function Input({ className = '', ...props }) {
    return (
      <input
        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-black ${className}`}
        {...props}
      />
    )
  }

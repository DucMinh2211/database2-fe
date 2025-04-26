import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 border-t">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Reddit Clone. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
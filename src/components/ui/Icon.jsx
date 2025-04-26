import React from 'react'
import { FaHome, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa'

/**
 * Component Icon
 * @param {string} name - Tên của icon (ví dụ: 'home', 'search', 'user', 'logout')
 * @param {string} className - Class CSS tùy chỉnh (nếu cần)
 * @returns JSX Element
 */
export default function Icon({ name, className = '' }) {
  const icons = {
    home: <FaHome className={className} />,
    search: <FaSearch className={className} />,
    user: <FaUser className={className} />,
    logout: <FaSignOutAlt className={className} />,
  }

  return icons[name] || null // Trả về icon tương ứng hoặc null nếu không tìm thấy
}
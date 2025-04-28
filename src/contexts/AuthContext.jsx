import React, { createContext, useContext, useState, useEffect } from 'react'

// Tạo context
const AuthContext = createContext()

// Provider để quản lý trạng thái xác thực
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // Lưu thông tin người dùng
  const [loading, setLoading] = useState(true) // Trạng thái tải dữ liệu
  const [error, setError] = useState(null) // Lưu thông báo lỗi nếu có

  // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi chạy
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (!response.ok) throw new Error('Không thể xác thực người dùng')
        const data = await response.json()
        setUser(data) // Cập nhật thông tin người dùng
      } catch (err) {
        setError(err.message)
        setUser(null) // Xóa thông tin người dùng nếu không xác thực được
      } finally {
        setLoading(false) // Kết thúc trạng thái tải
      }
    }

    fetchUser()
  }, [])

  // Hàm đăng nhập
  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) throw new Error('Đăng nhập thất bại')
      const data = await response.json()
      localStorage.setItem('token', data.token) // Lưu token vào localStorage
      setUser(data.user) // Cập nhật thông tin người dùng
      setError(null)
    } catch (err) {
      setError(err.message)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem('token') // Xóa token khỏi localStorage
    setUser(null) // Xóa thông tin người dùng
  }

  // Hook nội bộ để sử dụng AuthContext
  const useAuth = () => {
    return useContext(AuthContext)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, useAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
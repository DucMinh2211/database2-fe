import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
export default function LoginPage() {
  // Quản lý trạng thái form đăng nhập
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { Login } = useAuth()
  
  // Xử lý sự kiện đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) throw new Error('Đăng nhập thất bại. Vui lòng kiểm tra thông tin.')

      const data = await response.json()
      // Lưu token hoặc thông tin user vào localStorage (nếu cần)
      localStorage.setItem('token', data.token)

      // Điều hướng đến trang chủ sau khi đăng nhập thành công
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h1>

        {/* Hiển thị thông báo lỗi nếu có */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Form đăng nhập */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>

        {/* Liên kết đến SignupPage */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

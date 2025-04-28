import { useState } from 'react'

export default function useApi() {
  const [loading, setLoading] = useState(false) // Trạng thái tải dữ liệu
  const [error, setError] = useState(null) // Lưu thông báo lỗi nếu có

  // Hàm gọi API
  const callApi = async (url, options = {}) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Thêm token nếu cần
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Có lỗi xảy ra khi gọi API')
      }

      return await response.json()
    } catch (err) {
      setError(err.message)
      throw err // Ném lỗi để xử lý ở nơi gọi
    } finally {
      setLoading(false)
    }
  }

  return { callApi, loading, error }
}
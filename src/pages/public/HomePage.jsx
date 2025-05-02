import React, { useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Post from '@/components/features/posts/Post'

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch posts từ API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts')
        if (!response.ok) throw new Error('Không thể lấy danh sách bài viết')
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Trang chủ</h1>

      {/* Hiển thị trạng thái tải hoặc lỗi */}
      {loading && <div className="text-center">Đang tải bài viết...</div>}
      {error && <div className="text-red-500 text-center">Lỗi: {error}</div>}

      {/* Danh sách bài viết */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center text-gray-500">Không có bài viết nào</div>
      )}
      {!loading && !error && posts.map((post) => (
        <Card key={post.id}>
          <Post post={post} />
        </Card>
      ))}
    </div>
  )
}

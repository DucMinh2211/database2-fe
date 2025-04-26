import { useEffect, useState } from "react"
import axios from "axios"

export default function KarmaReport() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchKarma() {
      try {
        const response = await axios.get('/api/admin/karma') // Đường dẫn API backend
        setData(response.data)
      } catch (err) {
        setError(err.message || "Lỗi không xác định")
      } finally {
        setLoading(false)
      }
    }
    fetchKarma()
  }, [])

  if (loading) return <div className="p-6">Đang tải dữ liệu...</div>
  if (error) return <div className="p-6 text-red-500">Lỗi: {error}</div>

  return (
    <div className="p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Báo cáo Karma</h2>
      <table className="w-full bg-white rounded-lg shadow min-w-[500px]">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Subreddit</th>
            <th className="p-3 text-left">Karma</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="p-3">{item.username}</td>
              <td className="p-3">r/{item.subreddit}</td>
              <td className="p-3 font-medium">{item.karma}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

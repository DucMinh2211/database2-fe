import React, { useState, useEffect } from 'react'
import Table from '@/components/ui/Table'
import Card from '@/components/ui/Card'
import { useAuth } from '@/contexts/AuthContext'

export default function Reports() {
  const { user } = useAuth()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Lấy dữ liệu báo cáo từ API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/admin/reports')
        if (!response.ok) throw new Error('Không thể lấy dữ liệu báo cáo')
        const data = await response.json()
        setReports(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (user?.role === 'admin') {
      fetchReports()
    }
  }, [user])

  // Kiểm tra quyền truy cập
  if (user?.role !== 'admin') {
    return (
      <div className="p-6 text-center text-red-500">
        Bạn không có quyền truy cập trang này
      </div>
    )
  }

  // Hiển thị trạng thái tải hoặc lỗi
  if (loading) return <div className="p-6 text-center">Đang tải dữ liệu...</div>
  if (error) return <div className="p-6 text-red-500">Lỗi: {error}</div>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Báo cáo</h1>

      {/* Bảng báo cáo */}
      <Card title="Danh sách báo cáo">
        <Table
          columns={[
            { header: 'ID', accessor: 'id' },
            { header: 'Người báo cáo', accessor: 'reporter' },
            { header: 'Nội dung', accessor: 'content' },
            { header: 'Trạng thái', accessor: 'status' },
            {
              header: 'Hành động',
              cell: (row) => (
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleResolve(row.id)}
                  >
                    Xử lý
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(row.id)}
                  >
                    Xóa
                  </button>
                </div>
              ),
            },
          ]}
          data={reports}
        />
      </Card>
    </div>
  )
}

// Hàm xử lý báo cáo
const handleResolve = async (reportId) => {
  try {
    const response = await fetch(`/api/admin/reports/${reportId}/resolve`, {
      method: 'PUT',
    })
    if (!response.ok) throw new Error('Không thể xử lý báo cáo')
    alert('Báo cáo đã được xử lý')
    window.location.reload()
  } catch (err) {
    alert(err.message)
  }
}

// Hàm xóa báo cáo
const handleDelete = async (reportId) => {
  try {
    const response = await fetch(`/api/admin/reports/${reportId}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Không thể xóa báo cáo')
    alert('Báo cáo đã được xóa')
    window.location.reload()
  } catch (err) {
    alert(err.message)
  }
}

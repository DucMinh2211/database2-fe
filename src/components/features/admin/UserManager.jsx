import React, { useState, useEffect } from 'react'
import { Table, Input, Button } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'

export default function UserManager() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { User } = useAuth()

  // Fetch dữ liệu user
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users')
        if (!response.ok) throw new Error('Failed to fetch users')
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  // Xử lý hành động của users (delete)
  const handleUserAction = async (userId, action) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: action === 'delete' ? 'DELETE' : 'PUT',
      })
      if (!response.ok) throw new Error('Failed to perform action')
      setUsers(users.filter((user) => user.id !== userId))
    } catch (err) {
      setError(err.message)
    }
  }

  //  Lọc danh sách users theo từ khóa tìm kiếm.
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý người dùng</h1>

      {/* Search Input */}
      <div className="mb-4">
        <Input
          placeholder="Tìm kiếm người dùng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* User Table */}
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <Table
          columns={[
            { header: 'Username', accessor: 'username' },
            { header: 'Email', accessor: 'email' },
            { header: 'Ngày tham gia', accessor: 'created_at' },
            {
              header: 'Hành động',
              cell: (row) => (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleUserAction(row.id, 'delete')}
                  >
                    Xóa
                  </Button>
                </div>
              ),
            },
          ]}
          data={filteredUsers}
        />
      )}
    </div>
  )
}
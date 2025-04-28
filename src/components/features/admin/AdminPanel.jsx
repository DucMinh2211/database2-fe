import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table, Card, Button, Input } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'

const AdminPanel = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('analytics')
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pollStats, setPollStats] = useState([])
  const [subredditStats, setSubredditStats] = useState({})
  const [karmaData, setKarmaData] = useState([])
  const [loading, setLoading] = useState({
    users: true,
    polls: true,
    subreddits: true,
    karma: true
  })

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersRes = await fetch('/api/admin/users')
        const usersData = await usersRes.json()
        setUsers(usersData)

        // Fetch poll statistics
        const pollsRes = await fetch('/api/admin/polls/top-options')
        const pollsData = await pollsRes.json()
        setPollStats(pollsData)

        // Fetch subreddit analytics
        const subredditsRes = await fetch('/api/admin/subreddits/analytics')
        const subredditsData = await subredditsRes.json()
        setSubredditStats(subredditsData)

        // Fetch karma reports
        const karmaRes = await fetch('/api/admin/karma-reports')
        const karmaData = await karmaRes.json()
        setKarmaData(karmaData)

      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setLoading({
          users: false,
          polls: false,
          subreddits: false,
          karma: false
        })
      }
    }

    if (user?.role === 'admin') {
      fetchData()
    }
  }, [user])

  const handleUserAction = async (userId, action) => {
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: action === 'delete' ? 'DELETE' : 'PUT'
      })
      setUsers(users.filter(u => u.id !== userId))
    } catch (error) {
      console.error('Error performing user action:', error)
    }
  }

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (user?.role !== 'admin') {
    return (
      <div className="p-6 text-center text-red-500">
        Bạn không có quyền truy cập trang này
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 ${activeTab === 'analytics' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Phân tích
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Quản lý người dùng
        </button>
        <button
          onClick={() => setActiveTab('karma')}
          className={`px-4 py-2 ${activeTab === 'karma' ? 'border-b-2 border-blue-500' : ''}`}
        >
          Báo cáo Karma
        </button>
      </div>

      {activeTab === 'analytics' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Thống kê Poll">
            {loading.polls ? (
              <div>Đang tải...</div>
            ) : (
              <Table
                columns={[
                  { header: 'Poll', accessor: 'title' },
                  { header: 'Lựa chọn hàng đầu', accessor: 'top_option' },
                  { header: 'Số phiếu', accessor: 'votes' }
                ]}
                data={pollStats}
              />
            )}
          </Card>

          <Card title="Thống kê Subreddit">
            {loading.subreddits ? (
              <div>Đang tải...</div>
            ) : (
              <div className="space-y-4">
                <StatItem label="Tổng bài viết" value={subredditStats.total_posts} />
                <StatItem label="Bình luận TB/bài" value={subredditStats.avg_comments} />
                <StatItem label="Người dùng tích cực" value={subredditStats.most_active_user} />
              </div>
            )}
          </Card>
        </div>
      )}

      {activeTab === 'users' && (
        <Card>
          <div className="mb-4">
            <Input
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64"
            />
          </div>
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
                )
              }
            ]}
            data={filteredUsers}
          />
        </Card>
      )}

      {activeTab === 'karma' && (
        <Card title="Phân bổ Karma">
          {loading.karma ? (
            <div>Đang tải...</div>
          ) : (
            <Table
              columns={[
                { header: 'Người dùng', accessor: 'username' },
                { header: 'Cộng đồng', accessor: 'subreddit' },
                { header: 'Karma', accessor: 'karma' }
              ]}
              data={karmaData}
            />
          )}
        </Card>
      )}
    </div>
  )
}

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center p-2 border-b">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
)

StatItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

AdminPanel.propTypes = {
  // Thêm các prop cần thiết nếu có
}

export default AdminPanel
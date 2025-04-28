import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StatCard } from '@/components/ui/StatCard'
import { Card } from '@/components/ui/Card'
import { Table } from '@/components/ui/Table'
import { useAuth } from '@/contexts/AuthContext'
import { BarChart, PieChart } from '@/components/charts'
import { formatNumber } from '@/utils/helpers'

const Dashboard = () => {
  const { user } = useAuth()
  const [metrics, setMetrics] = useState(null)
  const [recentPosts, setRecentPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [metricsRes, postsRes] = await Promise.all([
          fetch('/api/admin/metrics'),
          fetch('/api/admin/recent-posts')
        ])

        if (!metricsRes.ok || !postsRes.ok) throw new Error('Failed to fetch data')

        const metricsData = await metricsRes.json()
        const postsData = await postsRes.json()

        setMetrics(metricsData)
        setRecentPosts(postsData)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (user?.role === 'admin') {
      fetchDashboardData()
    }
  }, [user])

  if (user?.role !== 'admin') {
    return (
      <div className="p-6 text-center text-red-500">
        Bạn không có quyền truy cập trang này
      </div>
    )
  }

  if (loading) return <div className="p-6 text-center">Đang tải dữ liệu...</div>
  if (error) return <div className="p-6 text-red-500">Lỗi: {error}</div>

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Tổng người dùng"
          value={metrics.total_users}
          icon="👥"
          trend={metrics.user_growth}
        />
        <StatCard
          title="Bài viết mới (24h)"
          value={metrics.daily_posts}
          icon="📝"
          trend={metrics.post_growth}
        />
        <StatCard
          title="Bình luận mới (24h)"
          value={metrics.daily_comments}
          icon="💬"
          trend={metrics.comment_growth}
        />
        <StatCard
          title="Subreddits"
          value={metrics.total_subreddits}
          icon="🏷️"
          trend={metrics.subreddit_growth}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Hoạt động theo giờ">
          <BarChart
            data={metrics.activity_by_hour}
            labels={Array.from({length: 24}, (_, i) => `${i}h`)}
          />
        </Card>
        
        <Card title="Phân bổ nội dung">
          <PieChart
            data={[metrics.posts_percentage, metrics.comments_percentage, metrics.polls_percentage]}
            labels={['Bài viết', 'Bình luận', 'Poll']}
            colors={['#3B82F6', '#10B981', '#F59E0B']}
          />
        </Card>
      </div>

      {/* Recent Posts Table */}
      <Card title="Bài viết gần đây">
        <Table
          columns={[
            { header: 'Tiêu đề', accessor: 'title' },
            { header: 'Tác giả', accessor: 'author' },
            { header: 'Cộng đồng', accessor: 'subreddit' },
            { 
              header: 'Lượt xem', 
              accessor: 'views',
              cell: (value) => formatNumber(value)
            },
            { 
              header: 'Upvotes', 
              accessor: 'upvotes',
              cell: (value) => formatNumber(value)
            }
          ]}
          data={recentPosts}
        />
      </Card>
    </div>
  )
}

export default Dashboard

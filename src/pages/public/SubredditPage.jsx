import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '@/components/features/posts/Post'

export default function SubredditPage() {
  const { subreddit } = useParams()
  const [subredditData, setSubredditData] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    // Fetch subreddit data and posts
    Promise.all([
      fetch(`/api/subreddit/${subreddit}`),
      fetch(`/api/posts?subreddit=${subreddit}`)
    ])
      .then(async ([subRes, postsRes]) => {
        if (!subRes.ok || !postsRes.ok) {
          throw new Error('Failed to fetch data')
        }
        const subData = await subRes.json()
        const postsData = await postsRes.json()

        setSubredditData(subData)
        setPosts(postsData)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [subreddit])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h1 className="text-3xl font-bold">r/{subredditData.name}</h1>
        <p className="text-gray-600 mt-2">{subredditData.description}</p>
        <div className="mt-4 text-sm text-gray-500">
          Created {new Date(subredditData.created_at).toLocaleDateString()}
        </div>
      </div>

      <div>
        {posts.length === 0 ? (
          <div>No posts available.</div>
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}

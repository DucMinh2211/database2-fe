// components/features/subreddits/SubredditInfo.jsx
import { Button } from '@/components/ui'

export default function SubredditInfo({ subreddit, isMember, onJoin }) {
  const handleJoin = () => {
    // Sử dụng subreddit.id để tham gia
    onJoin(subreddit.id)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">r/{subreddit.name}</h2>
        <Button 
          variant={isMember ? 'outline' : 'primary'}
          onClick={handleJoin}
        >
          {isMember ? 'Joined' : 'Join'}
        </Button>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">{subreddit.description}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="font-bold">{subreddit.memberCount}</div>
          <div className="text-gray-500 text-sm">Members</div>
        </div>
        <div>
          <div className="font-bold">{subreddit.activeUsers}</div>
          <div className="text-gray-500 text-sm">Online</div>
        </div>
        <div>
          <div className="font-bold">
            {new Date(subreddit.createdAt).toLocaleDateString()}
          </div>
          <div className="text-gray-500 text-sm">Created</div>
        </div>
      </div>
    </div>
  )
}
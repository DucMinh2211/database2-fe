import { useState } from 'react'
import VoteButtons from '../votes/VoteButtons'
import CommentSection from '../comments/CommentSection'

export default function Post({ post }) {
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow mb-4 p-4">
      <div className="flex">
        <VoteButtons 
          voteCount={post.karma} 
          onVote={(type) => console.log('Vote:', type)} 
        />
        <div className="ml-2 flex-1">
          <div className="text-xs text-gray-500">
            Posted by u/{post.user.username} in r/{post.subreddit.name}
          </div>
          <h2 className="text-xl font-medium">{post.title}</h2>
          <div className="mt-2 text-gray-800">{post.content}</div>
          
          {post.type === 'poll' && (
            <div className="mt-4">
              {post.options.map(option => (
                <div key={option.id} className="mb-2">
                  <button className="w-full text-left bg-gray-100 p-2 rounded">
                    {option.name} ({option.votes})
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center space-x-4 text-gray-500 text-sm">
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center hover:bg-gray-100 px-2 py-1 rounded"
            >
              <span className="material-icons mr-1">comment</span>
              {post.commentCount} Comments
            </button>
          </div>

          {showComments && <CommentSection postId={post.id} />}
        </div>
      </div>
    </div>
  )
}
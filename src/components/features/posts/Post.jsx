import { useState } from 'react'
import VoteButtons from '../shared/VoteButtons'
import Comment from './Comment'

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

          <div className="mt-4 flex items-center space-x-4 text-gray-500 text-sm">
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center hover:bg-gray-100 px-2 py-1 rounded"
            >
              <span className="material-icons mr-1">comment</span>
              {post.commentCount} Comments
            </button>
          </div>

          {/* Hiển thị danh sách bình luận */}
          {showComments && (
            <div className="mt-4">
              {post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
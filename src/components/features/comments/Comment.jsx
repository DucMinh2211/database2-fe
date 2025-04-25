import VoteButtons from '../votes/VoteButtons'

export default function Comment({ comment }) {
  return (
    <div className="flex border-l-2 border-gray-100 pl-4">
      <VoteButtons 
        voteCount={comment.karma} 
        onVote={(type) => console.log('Comment vote:', type)} 
      />
      <div className="ml-2 flex-1">
        <div className="text-xs text-gray-500">
          {comment.user.username} • {comment.created_at}
        </div>
        <div className="text-gray-800">{comment.content}</div>
        
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2 space-y-2">
            {comment.replies.map(reply => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import Comment from './Comment'

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    // Fetch comments from API
    fetch(`/api/comments/${postId}`)
      .then(res => res.json())
      .then(data => setComments(data))
  }, [postId])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Submit new comment to API
    console.log('Submitting comment:', newComment)
    setNewComment('')
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="What are your thoughts?"
          rows="3"
        />
        <div className="mt-2 text-right">
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            Comment
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
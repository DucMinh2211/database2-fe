// components/features/posts/PostActions.jsx
import { Button } from '@/components/ui'
import { useState } from 'react'
import { DotsHorizontalIcon, BookmarkIcon, FlagIcon, ShareIcon } from '@heroicons/react/outline'

export default function PostActions({ post, isOwner, onEdit, onDelete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleReport = () => {
    // Sử dụng post.id để báo cáo
    console.log('Reporting post:', post.id)
  }

  const handleShare = () => {
    // Sử dụng post data để chia sẻ
    navigator.share({
      title: post.title,
      url: `/post/${post.id}`
    })
  }

  const handleSave = () => {
    // Sử dụng post data để lưu
    console.log('Saving post:', post.id)
  }

  return (
    <div className="relative flex items-center gap-2 text-gray-500 text-sm">
      <Button variant="ghost" size="sm" onClick={handleShare}>
        <ShareIcon className="h-4 w-4 mr-1" />
        Share
      </Button>
      
      <Button variant="ghost" size="sm" onClick={handleSave}>
        <BookmarkIcon className="h-4 w-4 mr-1" />
        Save
      </Button>

      {!isOwner && (
        <Button variant="ghost" size="sm" onClick={handleReport}>
          <FlagIcon className="h-4 w-4 mr-1" />
          Report
        </Button>
      )}

      {isOwner && (
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
          
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
              <button 
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                onClick={() => onEdit(post)}
              >
                Edit Post
              </button>
              <button 
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-500"
                onClick={() => onDelete(post.id)}
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
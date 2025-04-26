import React from 'react'

export default function Comment({ comment }) {
  return (
    <div className="flex items-start space-x-3 py-2 border-b">
      {/* Avatar người dùng */}
      <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>

      {/* Nội dung bình luận */}
      <div className="flex-1">
        <div className="text-sm text-gray-500">
          <span className="font-medium">u/{comment.user.username}</span> • {new Date(comment.createdAt).toLocaleString()}
        </div>
        <p className="text-gray-800 mt-1">{comment.content}</p>

        {/* Nút tương tác */}
        <div className="mt-2 flex items-center space-x-4 text-gray-500 text-sm">
          <button className="hover:text-blue-500">Reply</button>
          <button className="hover:text-blue-500">Report</button>
        </div>
      </div>
    </div>
  )
}
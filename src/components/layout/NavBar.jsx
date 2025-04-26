import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState('') // Quản lý trạng thái tìm kiếm
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Điều hướng đến trang tìm kiếm với query
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-12">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-500">reddit</Link>

        {/* Thanh tìm kiếm */}
        <form onSubmit={handleSearch} className="ml-6 flex-1">
          <input 
            type="text" 
            placeholder="Search Reddit" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-100 px-4 py-1 rounded-full border hover:border-blue-500 focus:outline-none w-96"
          />
        </form>

        {/* Nút điều hướng */}
        <div className="flex items-center space-x-4">
          <Link to="/login" className="bg-gray-100 px-4 py-1 rounded-full">Log In</Link>
          <Link to="/signup" className="bg-orange-500 text-white px-4 py-1 rounded-full">Sign Up</Link>
        </div>
      </div>
    </nav>
  )
}
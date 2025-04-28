import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/public/HomePage'
import SubredditPage from '@/pages/public/SubredditPage'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import Dashboard from '@/pages/admin/Dashboard'
import Reports from '@/pages/admin/Reports'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/r/:subredditId" element={<SubredditPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
import LandingPage from './pages/landingpage'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import CitizenNavbar from './pages/citizen'
import AdminDashboard from './pages/admin'
import Category from './pages/category'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/citizen" element={<CitizenNavbar />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/category/:categoryName" element={<Category />} />
    </Routes>
    
  )
}

export default App

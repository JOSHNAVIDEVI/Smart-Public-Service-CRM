import LandingPage from './pages/landingpage'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import CitizenNavbar from './pages/citizen'
import AdminDashboard from './pages/admin'
import Category from './pages/category'
import ViewComplaint from './pages/components/viewComplaint'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/citizen" element={<CitizenNavbar />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/category/:categoryName" element={<Category />} />
      <Route path='/viewComplaint' element={<ViewComplaint />} />
    </Routes>
    
  )
}

export default App

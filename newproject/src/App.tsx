import LandingPage from './pages/landingpage'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

    </Routes>
    
  )
}

export default App

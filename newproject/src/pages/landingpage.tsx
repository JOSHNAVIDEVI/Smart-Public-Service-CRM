//import react from 'react';
import india from '../assets/india.jpg'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();

    const handleCitizenClick = () => {
        navigate('/login', { state: { type: 'citizen' } });
    };

    const handleAdminClick = () => {
        navigate('/login', { state: { type: 'admin' } });
    };

    return (
        <div className="landing-page">
            <div className="background-image" style={{ backgroundImage: `url(${india})` }}></div>
            <div className="text-white text-center py-10">
                <h1 className="text-2xl md:text-4xl font-bold mb-8">Smart Public Service CRM</h1>
                <p className="text-sm md:text-xl mb-12 text-gray-300 px-6">Report infrastructure problems, track resolution progress, and hold local government accountable — all in one place.</p>
            </div>
            <div className="content-card">

                <p>Login as</p>
                <div className="avatars">
                    <div className="avatar">
                        <img src="https://img.icons8.com/3d-fluency/94/user-male-circle.png" alt="Citizen" />
                        <button onClick={handleCitizenClick}  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded text-white cursor-pointer">Citizen</button>
                    </div>
                    <div className="avatar">
                        <img src="https://img.icons8.com/3d-fluency/94/user-shield.png" alt="Admin" />
                        <button onClick={handleAdminClick}  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded text-white cursor-pointer">Admin</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LandingPage;

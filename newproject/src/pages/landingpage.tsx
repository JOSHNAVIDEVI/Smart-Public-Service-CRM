//import react from 'react';
import india from '../assets/india.jpg'
import '../App.css'

const LandingPage = () => {
    return (
        <div className="landing-page">
            <div className="background-image" style={{ backgroundImage: `url(${india})` }}></div>
            <div className="text-white text-center py-10">
                <h1 className="text-2xl md:text-4xl font-bold mb-8">Smart Public Service CRM</h1>
            </div>
            <div className="content-card">

                <p>Login as</p>
                <div className="avatars">
                    <div className="avatar">
                        <img src="https://via.placeholder.com/100" alt="Citizen" />
                        <button>Citizen</button>
                    </div>
                    <div className="avatar">
                        <img src="https://via.placeholder.com/100" alt="Admin" />
                        <button>Admin</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LandingPage;

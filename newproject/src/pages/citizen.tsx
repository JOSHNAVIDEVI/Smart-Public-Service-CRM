import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import CitizenComplaint from './citizenComplaint';

export default function CitizenNavbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>


            <nav className="bg-cyan-500 text-white shadow-lg p-4">
                <div className="flex justify-between items-center px-2">
                    <h1 className="text-2xl font-bold">Citizen Portal</h1>
                    <div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded flex flex-end sm:hidden"
                    >
                        <RxHamburgerMenu />
                    </button>
                </div>
                    <div className="hidden sm:block flex gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2  hover:bg-blue-500 rounded"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate('/citizen')}
                            className="px-4 py-2 hover:bg-blue-500 rounded"
                        >
                            Submit Complaint
                        </button>
                        <button
                            onClick={() => navigate('/view-complaint')}
                            className="px-4 py-2 hover:bg-blue-500 rounded"
                        >
                            View Complaint
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                {/* for mobile view nav */}
                
                <div className={isOpen ? 'block' : 'hidden'}>
                    <div className='flex flex-col gap-2 mt-2 bg-cyan-500 p-4 rounded'>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2  hover:bg-blue-500 rounded"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate('/citizen')}
                            className="px-4 py-2 hover:bg-blue-500 rounded"
                        >
                            Submit Complaint
                        </button>
                        <button
                            onClick={() => navigate('/view-complaint')}
                            className="px-4 py-2 hover:bg-blue-500 rounded"
                        >
                            View Complaint
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div>
                <CitizenComplaint />
            </div>
        </div>
    );
}

// const citizen = () => {
//     return (
//         <div>
//             <Navbar />
//             <div className="p-6">
//                 <h2 className="text-2xl font-bold mb-4">Welcome, Citizen!</h2>
//                 <p className="text-gray-700">This is your dashboard where you can submit and track your complaints.</p>
//             </div>
//         </div>
//     );
// }

// export default citizen;
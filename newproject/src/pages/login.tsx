import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const location = useLocation();
    const type = location.state?.type || 'citizen';
    const [isSignUp, setIsSignUp] = useState(false);  // 👈 toggle state

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md flex flex-col items-center m-2">
                <a href="/" className="self-start text-sm text-gray-500 mb-6 hover:underline">&larr; Back to home</a>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {isSignUp ? 'Create an Account' : (type === 'admin' ? 'Login as Admin' : 'Login as Citizen')}
                </h2>

                <form className="w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50" />
                    </div>

                    {/* 👇 Only show Confirm Password when signing up */}
                    {isSignUp && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Confirm Password</label>
                            <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50" />
                        </div>
                    )}

                    <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-colors mb-4">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                {/* 👇 Toggle between Login and SignUp */}
                <div className="text-center text-gray-400 text-sm">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-blue-600 hover:underline"
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
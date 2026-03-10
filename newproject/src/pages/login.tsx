import { useLocation } from 'react-router-dom';

const Login = () => {
    const location = useLocation();
    const type = location.state?.type || 'citizen'; // Default to citizen if no state

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md flex flex-col items-center">
                <a href="/" className="self-start text-sm text-gray-500 mb-6 hover:underline">&larr; Back to home</a>
                <div className="flex flex-col items-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-green-400 flex items-center justify-center mb-4">
                        {/* Placeholder icon */}
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-2a4 4 0 10-8 0 4 4 0 008 0zm6 2a4 4 0 00-3-3.87" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        {type === 'admin' ? 'Login as Admin' : 'Login as Citizen'}
                    </h2>
                    <span className="text-gray-400 text-sm mt-1">
                        {type === 'admin' ? 'Admin Portal' : 'Citizen Portal'}
                    </span>
                </div>
                <form className="w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                            placeholder=""
                        />
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="block text-gray-700" htmlFor="password">Password</label>
                        <a href="#" className="text-blue-600 text-sm hover:underline">Forgot password?</a>
                    </div>
                    <div className="mb-6">
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
                            placeholder=""
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-colors mb-4"
                    >
                        Sign In
                    </button>
                </form>
                <div className="text-center text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('Trainee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulated Authentication
    const user = {
      name: name || (isLogin ? 'Authorized User' : ''),
      email,
      role,
      department
    };
    
    // Store user object to simulate auth state
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Role-based immediate redirection
    if (role === 'Trainee') {
      navigate('/dashboard');
    } else if (role === 'Trainer') {
      navigate('/trainer');
    } else if (role === 'Admin') {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link 
          to="/" 
          className="text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 text-sm font-bold inline-block mb-4"
        >
          &larr; Return to Home
        </Link>
        <h2 className="text-center font-display text-2xl sm:text-3xl font-black text-black dark:text-sky-400 uppercase tracking-wide">
          {isLogin ? 'System Access' : 'New Registry'}
        </h2>
      </div>

      {/* Main Authentication Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-800 py-6 sm:py-8 px-5 sm:px-8 shadow-brutal-lg border-2 sm:border-4 border-black">
          
          {/* View Toggle */}
          <div className="flex space-x-3 sm:space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2.5 font-display text-sm sm:text-base font-bold uppercase border-2 border-black transition-all focus:outline-none ${
                isLogin
                  ? 'bg-sky-400 text-black shadow-brutal'
                  : 'bg-transparent text-black dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-700'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2.5 font-display text-sm sm:text-base font-bold uppercase border-2 border-black transition-all focus:outline-none ${
                !isLogin
                  ? 'bg-sky-400 text-black shadow-brutal'
                  : 'bg-transparent text-black dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-700'
              }`}
            >
              Register
            </button>
          </div>

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-xs sm:text-sm font-bold text-black dark:text-sky-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-3 py-2.5 border-2 border-black bg-white dark:bg-slate-900 text-black dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 font-sans"
                  placeholder="Enter full name"
                />
              </div>
            )}

            <div>
              <label className="block text-xs sm:text-sm font-bold text-black dark:text-sky-300 uppercase tracking-wider mb-1">
                Credentials (Email)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2.5 border-2 border-black bg-white dark:bg-slate-900 text-black dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 font-sans"
                placeholder="user@capacity.connect"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-black dark:text-sky-300 uppercase tracking-wider mb-1">
                Passcode
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2.5 border-2 border-black bg-white dark:bg-slate-900 text-black dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 font-sans"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs sm:text-sm font-bold text-black dark:text-sky-300 uppercase tracking-wider mb-1">
                  Department
                </label>
                <input
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="block w-full px-3 py-2.5 border-2 border-black bg-white dark:bg-slate-900 text-black dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 font-sans"
                  placeholder="e.g. Engineering"
                />
              </div>
            )}

            <div>
              <label className="block text-xs sm:text-sm font-bold text-black dark:text-sky-300 uppercase tracking-wider mb-1">
                Select Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full px-3 py-2.5 border-2 border-black bg-white dark:bg-slate-900 text-black dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer font-sans"
              >
                <option value="Trainee">Trainee</option>
                <option value="Trainer">Trainer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border-2 border-black font-display text-base sm:text-lg font-bold text-black bg-orange-500 hover:bg-orange-400 active:bg-orange-600 shadow-brutal btn-tactile uppercase tracking-wider"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

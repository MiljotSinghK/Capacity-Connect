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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-['VT323'] transition-none">
      {/* Header Section */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Link 
          to="/" 
          className="text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300 text-2xl font-bold inline-block mb-4 transition-none"
        >
          &larr; Return to Base
        </Link>
        <h2 className="text-center text-5xl font-extrabold text-black dark:text-sky-400 uppercase tracking-widest">
          {isLogin ? 'System Access' : 'New Registry'}
        </h2>
      </div>

      {/* Main Authentication Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-slate-800 py-8 px-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] border-4 border-black transition-none">
          
          {/* View Toggle */}
          <div className="flex space-x-4 mb-8">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-3 text-2xl font-bold uppercase border-4 border-black transition-none focus:outline-none focus:ring-4 focus:ring-sky-400 ${
                isLogin
                  ? 'bg-sky-400 text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] -translate-y-1 -translate-x-1'
                  : 'bg-transparent text-black dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-slate-700 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-3 text-2xl font-bold uppercase border-4 border-black transition-none focus:outline-none focus:ring-4 focus:ring-sky-400 ${
                !isLogin
                  ? 'bg-sky-400 text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] -translate-y-1 -translate-x-1'
                  : 'bg-transparent text-black dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-slate-700 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]'
              }`}
            >
              Register
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-2xl font-bold text-black dark:text-sky-300 uppercase">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-3 py-3 border-4 border-black bg-white dark:bg-slate-900 text-black dark:text-white placeholder:font-mono placeholder-gray-500 font-['VT323'] text-2xl focus:outline-none focus:ring-4 focus:ring-sky-400 transition-none"
                    placeholder="Enter full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-2xl font-bold text-black dark:text-sky-300 uppercase">
                Credentials (Email)
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-3 border-4 border-black bg-white dark:bg-slate-900 text-black dark:text-white placeholder:font-mono placeholder-gray-500 font-['VT323'] text-2xl focus:outline-none focus:ring-4 focus:ring-sky-400 transition-none"
                  placeholder="user@capacity.connect"
                />
              </div>
            </div>

            <div>
              <label className="block text-2xl font-bold text-black dark:text-sky-300 uppercase">
                Passcode
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-3 border-4 border-black bg-white dark:bg-slate-900 text-black dark:text-white placeholder:font-mono placeholder-gray-500 font-['VT323'] text-2xl focus:outline-none focus:ring-4 focus:ring-sky-400 transition-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-2xl font-bold text-black dark:text-sky-300 uppercase">
                  Department
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="block w-full px-3 py-3 border-4 border-black bg-white dark:bg-slate-900 text-black dark:text-white placeholder:font-mono placeholder-gray-500 font-['VT323'] text-2xl focus:outline-none focus:ring-4 focus:ring-sky-400 transition-none"
                    placeholder="e.g. Engineering"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-2xl font-bold text-black dark:text-sky-300 uppercase">
                Select Role
              </label>
              <div className="mt-1">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full px-3 py-3 border-4 border-black bg-white dark:bg-slate-900 text-black dark:text-white font-['VT323'] text-2xl focus:outline-none focus:ring-4 focus:ring-sky-400 transition-none cursor-pointer"
                >
                  <option value="Trainee">Trainee</option>
                  <option value="Trainer">Trainer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border-4 border-black text-3xl font-extrabold text-black bg-orange-500 hover:bg-orange-400 active:bg-orange-600 active:translate-y-0 active:translate-x-0 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:shadow-none focus:outline-none focus:ring-4 focus:ring-sky-400 transition-none uppercase tracking-widest"
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

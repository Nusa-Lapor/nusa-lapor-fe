import React, { use, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Login attempt with:', email, password);
    // After successful login, navigate to dashboard or home
    // navigate('/dashboard');
  };

  const router = useRouter();
  useEffect(() => {
    router.prefetch('/auth/register');
    router.prefetch('/auth/reset-password');
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center min-h-screen">
          {/* Card container */}
          <div className="bg-white rounded-[10px] w-full 
            sm:w-[600px] sm:h-[750px] 
            md:p-8
            max-w-[800px] h-auto py-10 px-6">
            
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img 
                src="https://placehold.co/189x72" 
                alt="Logo" 
                className="h-16 sm:h-16 w-auto" 
              />
            </div>
            
            {/* Login Title */}
            <h1 className="text-red-700 font-bold text-4xl text-center mt-4 mb-8">
              Login
            </h1>
            
            <form onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="mb-6">
                <label 
                  htmlFor="email" 
                  className="block text-red-700 text-2xl mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-16 sm:h-20 px-4 rounded-[5px] border border-slate-200 focus:outline-none focus:border-red-700"
                  required
                />
              </div>
              
              {/* Password Field */}
              <div className="mb-8">
                <label 
                  htmlFor="password" 
                  className="block text-red-700 text-2xl mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-16 sm:h-20 px-4 rounded-[5px] border border-slate-200 focus:outline-none focus:border-red-700"
                  required
                />
              </div>
              
              {/* Login Button */}
              <button 
                type="submit"
                className="w-full h-16 sm:h-20 bg-red-700 rounded-[5px] text-white text-xl sm:text-3xl font-normal hover:bg-red-800 transition duration-300"
              >
                Login
              </button>
            </form>
            
            {/* Register Link */}
            <div className="text-center mt-6">
              <Link 
                to="/register" 
                className="text-red-700 text-xl sm:text-3xl hover:text-red-900"
              >
                Belum punya akun? Daftar
              </Link>
            </div>
            
            {/* Reset Password Link */}
            <div className="text-center mt-4">
              <Link 
                to="/reset-password" 
                className="text-red-700 text-xl sm:text-3xl hover:text-red-900"
              >
                Lupa password? Reset
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
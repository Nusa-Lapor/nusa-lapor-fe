'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Replace with your actual API call
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        localStorage.setItem('token', data.token);
        // Redirect
        router.push('/dashboard');
      } else {
        // Show error
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={189}
                height={72}
                className="h-16 sm:h-16 w-auto" 
              />
            </div>
            
            {/* Login Title */}
            <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-10">
              Masuk
            </h1>
            
            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6 sm:space-y-8">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Masukkan email anda"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Masukkan password anda"
                />
              </div>
              
              <div>
                <Button type="submit" variant="primary" className="w-full py-3" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Login'}
                </Button>
              </div>
            </form>
            
            {/* Register Link */}
            <div className="mt-8 sm:mt-12 text-center">
              <Link href="/auth/register" className="text-red-700 text-xl sm:text-3xl hover:text-red-900">
                Belum punya akun? Daftar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
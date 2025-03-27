'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { PasswordField } from '../register/components/PasswordField';
import { useAuthContext } from '@/providers/AuthProvider';
import { Message } from '@/components/elements/FormMessage/interface';
import { FormMessage } from '@/components/elements/FormMessage/FormMessage';

interface LoginPageProps {
  signInAction?: (formData: { email: string; password: string }) => void;
  searchParams?: Message;
}

const LoginPage: React.FC<LoginPageProps> = ({ signInAction, searchParams }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { login, isLoading } = useAuthContext();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await login({ email, password });
      
      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  useEffect(() => {
    router.prefetch('/auth/register');
    router.prefetch('/');

    document.body.style.backgroundColor = '#e5e7eb'; 
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.minHeight = '';
      document.body.style.margin = '';
    };
  }, [router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full h-auto shadow-lg overflow-hidden">
        <CardHeader className="pt-10 pb-0">
          <div className="flex justify-center mb-8">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={160}
              height={72}
              className="h-20 w-auto sm:h-16" 
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-center text-red-700 mb-6">
            Login
          </h1>
        </CardHeader>
        
        <CardContent className="pt-6 px-6 md:px-8">
          <form onSubmit={handleLogin} className="space-y-8 w-full max-w-[684px] sm:max-w-[513px] mx-auto">
            <div>
              <label htmlFor="email" className="block text-red-700 text-2xl font-normal mb-4">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-24 sm:h-20 px-4 py-2 border border-slate-200 rounded-[5px]"
                placeholder="Masukkan email anda"
              />
            </div>

            {/* Gap */}
            <div className="h-6" />
            
            <div>
              <PasswordField
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
              />
            </div>

            {/* Gap */}
            <div className="h-10" />
            
            {/* Login Button - matches Figma styles */}
            <Button
              type="submit"
              variant="primary"
              className="w-full h-24 sm:h-20"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
            <FormMessage message={searchParams ?? { message: error, type: 'error' } as Message} />
          </form>
        </CardContent>
        
        <CardFooter className="flex-col pb-10 pt-2">
          {/* Register Link */}
          <div className="mb-4 text-center">
            <Link href="/auth/register" className="text-red-700 text-3xl font-normal">
              Belum punya akun? Daftar
            </Link>
          </div>
  
          {/* Forgot Password Link */}
          <div className="text-center">
            <Link href="/" className="text-red-700 text-3xl font-normal">
              Masuk tanpa akun
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export { LoginPage };
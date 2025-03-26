'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    router.prefetch('/auth/login');
    router.prefetch('/auth/register');
    router.prefetch('/help-center');
    router.prefetch('/hotline');
  }, [router]);

  const isActive = (path: string) => {
    return pathname === path ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="Nusa Lapor Logo"
                width={40}
                height={40}
                className="w-auto h-8"
              />
              <span className="text-xl font-semibold text-primary">Nusa Lapor</span>
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: '/', label: 'Dashboard' },
              { path: '/help-center', label: 'Help Center' },
              { path: '/hotline', label: 'Hotline Darurat' }
            ].map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={`${isActive(item.path)} transition-colors duration-200`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <div className="flex items-center space-x-4">
            <Button variant="primary" asChild>
              <Link href="/auth/login">
                Login
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                  mobileMenu.classList.toggle('hidden');
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden py-2 space-y-1">
          {[
            { path: '/', label: 'Dashboard' },
            { path: '/help-center', label: 'Help Center' },
            { path: '/hotline', label: 'Hotline Darurat' }
          ].map((item) => (
            <Link 
              key={item.path}
              href={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path)}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
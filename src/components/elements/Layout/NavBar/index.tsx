'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button';

export const NavBar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo dan Brand */}
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

          {/* Menu Navigasi */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`${isActive('/')} transition-colors duration-200`}
            >
              Dashboard
            </Link>
            <Link 
              href="/help-center" 
              className={`${isActive('/help-center')} transition-colors duration-200`}
            >
              Help Center
            </Link>
            <Link 
              href="/hotline" 
              className={`${isActive('/hotline')} transition-colors duration-200`}
            >
              Hotline Darurat
            </Link>
          </div>

          {/* Tombol Login */}
          <div className="flex items-center">
            <Button variant="primary" asChild>
              <Link href="/login">
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
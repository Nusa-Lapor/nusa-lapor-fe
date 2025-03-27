"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/providers/AuthProvider";
import { useAuth, authState } from "@/services/auth";

export const NavBar = () => {
  // Get current path and router for navigation
  const pathname = usePathname();
  const router = useRouter();

  // Get auth state and actions from Auth context
  const { isLoading, logout, checkAuth } = useAuthContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  let isAuthenticated = authState.isAuthenticated;

  // Check auth status on component mount and route changes
  useEffect(() => {
    checkAuth();
  }, [checkAuth, pathname]);

  // Function to handle logout button click
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggingOut) return; // Prevent multiple clicks

    setIsLoggingOut(true); // Show loading state

    try {
      // Call logout and wait for it to complete
      await logout();
      
      // Redirect to login page
      router.push("/auth/login");
    } catch (error: unknown) {
      // Redirect to login page even on error
      router.push("/auth/login");
    } finally {
      setIsLoggingOut(false); // Reset loading state
    }
  };

  // A helper function to determine active links
  const isActive = (path: string) => {
    return pathname === path
      ? "text-primary font-semibold"
      : "text-gray-600 hover:text-primary";
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
              <span className="text-xl font-semibold text-primary">
                Nusa Lapor
              </span>
            </Link>
          </div>

          {/* Navigation Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { path: "/", label: "Dashboard" },
              { path: "/help-center", label: "Help Center" },
              { path: "/hotline", label: "Hotline Darurat" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${isActive(
                  item.path
                )} transition-colors duration-200`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Login/Logout Button */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <Button className="hidden md:block" disabled>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Loading...
              </Button>
            ) : isAuthenticated ? (
              <Button
                onClick={handleLogout}
                className="hidden md:block"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/auth/login")}
                className="hidden md:block"
              >
                Login
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => {
                const mobileMenu = document.getElementById("mobile-menu");
                if (mobileMenu) {
                  mobileMenu.classList.toggle("hidden");
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden py-2 space-y-1">
          {[
            { path: "/", label: "Dashboard" },
            { path: "/help-center", label: "Help Center" },
            { path: "/hotline", label: "Hotline Darurat" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
                item.path
              )}`}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Add logout/login for mobile */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
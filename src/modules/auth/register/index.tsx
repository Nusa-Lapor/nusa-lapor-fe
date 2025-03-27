"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { PasswordField } from "./components/PasswordField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardBody, CardFooter, CardContent } from "@/components/ui/card";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your registration logic here
    console.log({ username, fullName, email, password, confirmPassword });
  };

  React.useEffect(() => {
    router.prefetch("/auth/login");
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
            Register
          </h1>
        </CardHeader>
        
        <CardContent className="pt-6 px-6 md:px-8">
          <form onSubmit={handleRegister} className="space-y-8 w-full max-w-[684px] sm:max-w-[513px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-red-700 text-2xl font-normal mb-4">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-24 sm:h-20 px-4 py-2 border border-slate-200 rounded-[5px]"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-red-700 text-2xl font-normal mb-4">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-24 sm:h-20 px-4 py-2 border border-slate-200 rounded-[5px]"
                  required
                />
              </div>
            </div>
            
            {/* Gap */}
            <div className="h-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-red-700 text-2xl font-normal mb-4">
                  Nama Lengkap
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-24 sm:h-20 px-4 py-2 border border-slate-200 rounded-[5px]"
                  required
                />
              </div>

              {/* Gap */}
              <div className="h-6" />

              {/* Password */}
              <div>
                <PasswordField
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-24 sm:h-20 px-4 py-2 border border-slate-200 rounded-[5px]"
                  label="Password"
                />
              </div>
            </div>
            
            {/* Gap */}
            <div className="h-6" />
            
            {/* Confirm password - full width */}
            <div>
              <PasswordField
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-24 sm:h-20 px-4 py-2 border border-slate-200 rounded-[5px]"
                label="Konfirmasi Password"
              />
            </div>
            
            {/* Gap */}
            <div className="h-10" />
            
            {/* Register Button - matches Login styling */}
            <Button
              type="submit"
              variant="primary"
              className="w-full h-24 sm:h-20"
              disabled={false}
            >
              Register
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex-col pb-10 pt-2">
          {/* Login Link */}
          <div className="text-center">
            <Link href="/auth/login" className="text-red-700 text-3xl font-normal">
              Sudah punya akun? Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export { RegisterPage };
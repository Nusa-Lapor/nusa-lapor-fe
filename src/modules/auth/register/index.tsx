import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { PasswordField } from "./components/PasswordField";
import { useState } from "react";
import { useRouter } from "next/router";

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
    router.prefetch('/auth/login');
  }, [router]);
  

  return (
    <div className="w-full min-h-screen bg-slate-200 flex justify-center items-center py-10">
      <div className="w-full max-w-[1350px] md:w-[900px] bg-white rounded-[10px] p-8 md:p-6">
        <div className="mb-8">
          <Image
            src="https://placehold.co/252x96"
            alt="Logo"
            width={252}
            height={96}
            className="mb-4"
          />
          <h1 className="text-4xl font-bold text-red-700 text-center">Register</h1>
        </div>
        
        <form onSubmit={handleRegister} className="flex flex-col lg:flex-row lg:flex-wrap lg:justify-between">
          <div className="mb-6 lg:w-[48%]">
            <label htmlFor="username" className="block text-2xl text-red-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-24 bg-white rounded-[5px] border border-slate-200 px-4"
            />
          </div>
          
          <div className="mb-6 lg:w-[48%]">
            <label htmlFor="fullName" className="block text-2xl text-red-700 mb-2">
              Nama Lengkap
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-24 bg-white rounded-[5px] border border-slate-200 px-4"
            />
          </div>
          
          <div className="mb-6 lg:w-[48%]">
            <label htmlFor="email" className="block text-2xl text-red-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-24 bg-white rounded-[5px] border border-slate-200 px-4"
            />
          </div>
          
          <div className="mb-6 lg:w-[48%]">
            <label htmlFor="password" className="block text-2xl text-red-700 mb-2">
              Password
            </label>
            <PasswordField
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-24 bg-white rounded-[5px] border border-slate-200 px-4"
            />
          </div>
          
          <div className="mb-8 lg:w-full lg:flex lg:justify-center">
            <div className="lg:w-[48%]">
              <label htmlFor="confirmPassword" className="block text-2xl text-red-700 mb-2">
                Konfirmasi Password
              </label>
              <PasswordField
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-24 bg-white rounded-[5px] border border-slate-200 px-4"
              />
            </div>
          </div>
          
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-full max-w-[750px] h-24 bg-red-700 text-white text-3xl font-bold rounded-[5px]"
            >
              Register
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-3xl text-red-700">
            Sudah punya akun? {" "}
            <Link href="/auth/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export { RegisterPage };
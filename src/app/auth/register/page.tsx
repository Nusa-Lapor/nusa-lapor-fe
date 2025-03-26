"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { RegisterPage } from "@/modules/auth/register";

const Page = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", {
        username,
        fullName,
        email,
        password,
        confirmPassword,
      });
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RegisterPage
      username={username}
      setUsername={setUsername}
      fullName={fullName}
      setFullName={setFullName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      handleRegister={handleRegister}
    />
  );
}

export default Page;
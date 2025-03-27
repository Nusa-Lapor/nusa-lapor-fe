"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ id, value, onChange, className, label }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  return (
    <>
      <label htmlFor={id} className="font-extrabold text-2xl md:text-base mb-1">{label ?? id}</label>
      <div className="flex items-center relative">
        <input
          id={id}
          type={isPasswordVisible ? "text" : "password"}
          name={id}
          value={value}
          onChange={onChange}
          placeholder="Masukkan Password"
          className={`w-full h-24 sm:h-20 border-[2px] md:text-base text-sm rounded-[8px] focus:outline-yellow-400 border-accents-blue-3 bg-accents-yellow-5 py-4 px-8 placeholder-text-dark-3 ${className || ""}`}
        />
        <button
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 px-3 py-2"
          type="button"
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          {isPasswordVisible ? <Eye /> : <EyeOff />}
        </button>
      </div>
    </>
  );
};
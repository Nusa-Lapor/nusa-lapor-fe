import React from "react";
import { IconProps } from "./interface";

const Burger: React.FC<IconProps> = ({
  //   fill = 'fill-[#551D4D]',
  className,
  size,
}) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${size}`}
    >
      <path d="M4 16H18" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 24H10" strokeWidth="3" strokeLinecap="round" />
      <path d="M4 8H28" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

export default Burger;
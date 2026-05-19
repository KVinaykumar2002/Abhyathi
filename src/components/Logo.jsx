import React from "react";

const sizes = {
  sm: "h-8 w-auto",
  md: "h-10 w-auto",
  lg: "h-12 w-auto",
};

const Logo = ({ size = "md", className = "" }) => (
  <img
    src="/logo.png"
    alt="Abhyati Food Pak"
    className={`object-contain ${sizes[size] ?? sizes.md} ${className}`}
  />
);

export default Logo;

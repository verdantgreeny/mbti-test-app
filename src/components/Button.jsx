import React from "react";

const Button = ({ onClick, children, className, type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-6 py-3 text-white rounded-full transition duration-300 border border-gray-300 shadow-md ${className}`}
  >
    {children}
  </button>
);

export default Button;

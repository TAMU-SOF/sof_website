'use client';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md bg-white text-black">
      <a href="/" className="logo">
        <div className="flex items-center space-x-2">
          <img src="/sof_logo.png" alt="Logo" className="h-8 w-auto" />
        </div>
      </a>

      <div className="flex space-x-8 text-base font-medium">
        <a href="#" className="hover:text-gray-500 transition-colors duration-200">Home</a>
        <a href="#" className="hover:text-gray-500 transition-colors duration-200">About us</a>
        <a href="#" className="hover:text-gray-500 transition-colors duration-200">Portfolio</a>
      </div>

      <button className="contact-button bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200">
        Apply Now!
      </button>
    </nav>
  );
}

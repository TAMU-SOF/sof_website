'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 shadow-md text-white"
      animate={{ y: hideNavbar ? -90 : 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <a href="/" className="logo">
        <div className="flex items-center space-x-2">
          <img src="/sof_trans_logo.png" alt="Logo" className="h-8 w-auto" />
        </div>
      </a>

      <div className="flex space-x-8 text-base font-medium">
        <a href="#" className="hover:text-gray-300 transition-colors duration-200">Home</a>
        <a href="#" className="hover:text-gray-300 transition-colors duration-200">About us</a>
        <a href="#" className="hover:text-gray-300 transition-colors duration-200">Portfolio</a>
      </div>

      <button className="contact-button px-6 py-4 text-white rounded-[2rem] shadow-[0_4px_20px_rgba(142,45,226,0.7)] transition hover:scale-105 hover:brightness-110 focus:ring-4 focus:ring-purple-400 focus:outline-none disabled:opacity-50 animated-gradient">
        Apply Now!
      </button>
    </motion.nav>
  );
}

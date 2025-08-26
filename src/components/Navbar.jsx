'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hide, setHide] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 50)
      setHide(y > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    ['/', 'Home'],
    ['/contact', 'Contact Us'],
  ]

  const barBase =
    'fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 md:px-8 py-3 transition-colors duration-300 backdrop-blur-md'

  const barTone = scrolled
    ? 'bg-white/80 shadow-md text-[#500000]'
    : 'bg-transparent text-[#500000]'

  return (
    <>
      {/* Top Nav Bar */}
      <motion.nav
        animate={{ y: hide ? -90 : 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={`${barBase} ${barTone}`}
      >
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-base font-medium">
          {navLinks.map(([href, label]) => (
            <motion.a
              key={href}
              href={href}
              whileHover={{ y: -2 }}
              className="relative group hover:text-[#800000] transition-colors duration-300"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#800000] to-[#500000] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#800000]/30"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </motion.nav>

      {/* Fullscreen Mobile Menu (blurred) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] bg-white/30 backdrop-blur-xl"
          >
            {/* Header row inside overlay */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4">
              <span className="text-lg font-semibold text-[#500000]">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex items-center justify-center rounded-md p-2 text-[#500000] focus:outline-none focus:ring-2 focus:ring-[#800000]/30"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            {/* Centered text-only links */}
            <motion.nav
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut', delay: 0.05 }}
              className="h-full flex flex-col items-center justify-center gap-8 px-6"
            >
              {navLinks.map(([href, label], idx) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: 0.06 * idx }}
                  className="
                    text-2xl sm:text-3xl font-semibold text-[#500000]
                    hover:opacity-80 focus:opacity-90 
                    underline-offset-4 hover:underline decoration-[#800000]/60
                    px-3 py-3 rounded-md
                    focus:outline-none focus:ring-2 focus:ring-[#800000]/30
                    transition
                  "
                >
                  {label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

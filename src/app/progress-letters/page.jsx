'use client'

import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

// Define the sections and corresponding PDF files
const letters2025 = [
  { label: 'H1', file: 'public_letters/B.D. Sterling H1 2025 Letter.pdf' },
  // add more entries as needed
]

export default function QuarterlyLetters() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-28 px-6 pb-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl font-normal tracking-wide text-gray-800 mb-6">
            PROGRESS LETTERS
          </h1>
          <div className="w-full h-px bg-gray-400"></div>
        </motion.div>

        {/* 2025 Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-4xl font-light text-center text-gray-800 mb-10">
            2025
          </h2>
          <div className="w-full h-px bg-gray-400 mb-10"></div>

          <div className="flex justify-center gap-10">
            {letters2025.map((section) => (
              <a
                key={section.label}
                href={section.file}
                download
                className="border-2 border-gray-800 px-6 py-3 hover:bg-gray-100 transition"
              >
                <span className="text-base font-normal text-gray-800">
                  {section.label}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

'use client'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function Research() {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },  // start off-screen & transparent
    rest:   { opacity: 1, y: 0 },   // normal state after load
    hover:  { scale: 1.03 },        // subtle zoom (or y: -5 if you prefer)
  }
  
  const companies = [
    {
      name: 'Google',
      href: '/research/google',
      logo: 'google.jpg',
      summary: 'Google is a leading tech company with a strong presence in search, high margin YouTube advertising, a growing cloud business, and exposure to artificial intelligence and autonomous driving through Waymo. With a solid balance sheet and consistent buybacks, it is diversifying its revenue and remains attractively valued despite near term capital spending and overstated AI search concerns.',
    },
    {
      name: 'ASML',
      href: '/research/asml',
      logo: 'ASML-Logo.png',
      summary: 'ASML’s EUV technology gives it a monopolistic edge in advanced chip manufacturing, driving high margin system sales and recurring service revenues through its servicing segment. Recent stock weakness, due to China exposure, slow market recoveries, and elevated inventories, are short term headwinds. These factors have temporarily dislocated ASML’s price from its fundamentals.',
    },
    {
      name: 'United Healthcare',
      href: '/research/unitedhealthcare',
      logo: 'UNH-logo.jpg',
      summary: 'The nation’s largest private healthcare platform, spanning insurance, health services, and data analytics, has seen $32 million in insider buying as a DOJ probe likely concludes with a modest fine. With Medicare margin pressure behind them and insurance pricing adjustments ahead, normalized earnings and multiple expansion point to rapid 17.7% growth rate and meaningful upside from low valuation.',
    },
  ]

  return (
    <main className="min-h-screen bg-white text-black pt-28">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-5xl mx-auto py-14 px-4">
          {/* Title */}
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Equity Research
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-lg text-center text-gray-700 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
          </motion.p>

          {/* Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company, index) => (
              <Link key={company.name} href={company.href}>
                <motion.div
                  /* 1️⃣  use the variants */
                  variants={cardVariants}
                  initial="hidden"            /* page-load start */
                  animate="rest"              /* page-load finish */
                  whileHover="hover"          /* interactive state */
                  transition={{
                    duration: 0.7,
                    delay: 0.7 + index * 0.2, /* stagger L → R */
                    ease: 'easeOut',
                  }}
                  className="relative w-full min-h-[300px] overflow-hidden rounded-2xl border border-gray-300 shadow-md hover:shadow-xl cursor-pointer"
                >
                  {/* Base (logo + name) */}
                  <motion.div
                    variants={{
                      rest:  { opacity: 1,  y: 0  },
                      hover: { opacity: 0.2, y: -10 },
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center h-full p-6 text-center"
                  >
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="h-42 object-contain mb-4"
                    />
                    <h3 className="text-xl font-semibold">
                      {company.name}
                    </h3>
                  </motion.div>

                  {/* Hover overlay with summary */}
                  <motion.div
                    variants={{
                      rest:  { opacity: 0, y: 20 },
                      hover: { opacity: 1, y: 0  },
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-white px-4 text-center"
                  >
                    <p className="text-[15px] text-gray-800">
                      {company.summary.replace(' (Click the panel for more info)', '')}
                      <span className="font-bold"> Click the panel for more info</span>
                    </p>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  )
}

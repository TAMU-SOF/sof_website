'use client'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function Strategy() {
  return (
    <main className="min-h-screen bg-white text-black pt-24">
      <Navbar />

      {/* Page content entrance animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >

        <div className="max-w-5xl mx-auto py-16 px-4">

          {/* Animated Title */}
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Our Investment Strategy
          </motion.h2>

          {/* Animated Body */}
          <motion.p
            className="text-lg leading-relaxed text-gray-700 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            At B.D. Sterling, we focus on what we call Dislocated High Quality Companies, an idea coined by Mark Mahaney. These are fundamentally sound, competitively advantaged businesses that have been temporarily mispriced due to misunderstood narratives or short term market dislocations.
            <br /><br />
            We seek companies with proven business models, resilient cash flows, and long growth runways, yet are trading at unjustified discounts to intrinsic value. Our edge lies in recognizing when the market has overreacted or misjudged the core strength of a business.
            <br /><br />
            Rather than chasing momentum or reacting to headlines, we dive deep, performing thorough fundamental research, building robust valuation models, and identifying catalysts that could re-rate the business over time. Our process is structured to minimize downside while capturing asymmetric upside as quality eventually shines through short term volatility.
            <br /><br />
            We understand businesses and act decisively when prices disconnect from reality.
          </motion.p>

        </div>
        
      </motion.div>
    </main>
  )
}

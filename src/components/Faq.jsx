'use client'

import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function SleekFAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqData = [
  {
    q: "Training the Street",
    a: "Get access to world-class Training the Street programs in modeling, valuation, and Wall Street fundamentals."
  },
  {
    q: "Networking",
    a: "Build authentic relationships and expand your professional network through structured events and guidance."
  },
  {
    q: "Resume Workshop",
    a: "Learn how to craft a polished, impactful resume that helps you stand out in any application pool."
  },
  {
    q: "Technical Workshops",
    a: "Develop hands-on skills in finance and business that employers are actively looking for."
  },
];


  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Resources
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#800000] to-[#500000] mx-auto rounded-full"></div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.q}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </motion.div>
              </button>

              {/* Answer */}
              <motion.div
                initial={false}
                animate={{ 
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6 pt-0">
                  <div className="w-full h-px bg-gray-200 mb-6"></div>
                  <p className="text-gray-600 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            Have more questions? We'd love to hear from you.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-[#500000] text-[#500000] font-semibold rounded-xl hover:bg-[#fdf2f2] transition-all duration-300"
            >
              Get in Touch
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
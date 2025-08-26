'use client'
import { useState, useEffect } from 'react'
import FundVsSP500Chart from '@/components/FundVsSP500Chart'
import { motion } from 'framer-motion'

export default function SheetTable() {
  const [sheet, setSheet] = useState({ header: [], data: [] })
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/sheet')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(obj => setSheet(obj))
      .catch(err => {
        console.error('Fetch /api/sheet failed:', err)
        setError(err.message)
      })
  }, [])

  const { header, data } = sheet

  if (error) return <p className="text-red-600">Error: {error}</p>
  if (!header.length) return <p>Loading…</p>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="flex flex-col items-center space-y-4"
    >

      {/* Top Text */}
      <motion.p
        className="text-base font-medium text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        We are committed to full transparency with our investors. Below is a live snapshot of individual investor performance, tracking total returns, fund outperformance, and benchmark comparisons.<br />
        This data helps our investors stay informed and confident in their partnership with us.
      </motion.p>

      {/* Animated Table */}
      <motion.div
        className="overflow-x-auto bg-white rounded-xl shadow-xl p-6 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <table className="table-auto border-collapse w-full text-lg">
          <thead>
            <tr>
              {header.map((col, i) => (
                <th
                  key={i}
                  className="border border-gray-300 px-4 py-3 text-center bg-gray-100 font-semibold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {data.map((cell, i) => {
                const isGreen = i >= 4 && i <= 6
                const isBoldF3 = i === 4
                const cellClass =
                  `border border-gray-300 px-4 py-3 text-center text-sm ` +
                  (isGreen ? (isBoldF3 ? 'bg-green-400 ' : 'bg-green-200 ') : '') +
                  (isBoldF3 ? 'font-bold ' : '')
                return (
                  <td key={i} className={cellClass}>
                    {cell}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </motion.div>

      {/* After table content */}
      <motion.p
        className="text-sm font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        Performance data is updated at the end of the trading day.
      </motion.p>

      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <p className="text-lg font-medium text-left">Fund Strategy Snapshot</p>
      </motion.div>

      <motion.p
        className="text-base font-medium text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        Our fund invests in long-term quality companies when they're undervalued relative to their projected growth potential. When we see a great company sell off due to short-term market risks, we capitalize immediately and generate alpha by acquiring high-conviction positions at discounted valuations. As the market corrects its pricing over time, our disciplined approach allows us to realize outsized returns while minimizing unnecessary risk. We focus on strong fundamentals, attractive valuation, and durable competitive advantages, allowing the portfolio to compound steadily while opportunistically taking advantage of temporary dislocations.
      </motion.p>

      {/* Chart Section */}
      <motion.p
        className="text-lg font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        B.D. Sterling Fund Performance
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="w-full"
      >
        <FundVsSP500Chart />
      </motion.div>

    </motion.div>
  )
}

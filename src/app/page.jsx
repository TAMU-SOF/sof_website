'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

import Navbar from '@/components/Navbar'
import StatBoxSection from '@/components/StatBoxSection'
import Faq from '@/components/Faq'
import RotatingWords from '@/components/RotatingWords'
import PictureSlider from '@/components/PictureSlider'
import Timeline from '@/components/Timeline'
import { Users } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black pt-16 overflow-hidden">
      <Navbar />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-[#f5e6e6] rounded-full opacity-10"
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-48 h-48 bg-[#f0dcdc] rounded-full opacity-15"
          animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-32 h-32 bg-[#ebcfcf] rounded-full opacity-10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Content container with delayed entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10"
      >
      {/* HERO */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-[85rem] mx-auto px-10 py-16 min-h-[85vh] gap-10">
        {/* Left */}
        <div className="md:w-1/2 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col space-y-6 md:space-y-7"
          >
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-[1.1]
              bg-gradient-to-r from-[#3a0000] via-[#800000] to-[#500000]
              bg-clip-text text-transparent animate-gradient"
            >
              Texas A&amp;M Scholars of Finance
            </h1>

            <p className="text-[28px] md:text-[32px] leading-[1.35] text-black font-semibold tracking-normal max-w-[28ch]">
              Shaping <RotatingWords heightEm={1} /><br />
              in student leaders<br />
              across Texas A&amp;M
            </p>

            <div className="mt-1 flex flex-col sm:flex-row gap-4">
              <Link href="https://app.scholarsoffinance.org/application/?universityId=652593b1-e24e-44a3-a896-29cf08961604">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#800000] to-[#500000] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Apply to SOF
                </motion.button>
              </Link>

              <Link href="https://forms.gle/wdBp2GYrpD3LzHop6">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-[#500000] text-[#500000] font-semibold rounded-xl hover:bg-[#fdf5f5] transition-all duration-300"
                >
                  Apply to Maroon Fund
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right */}
        <div className="md:w-1/2 w-full">
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            {/* RESET any internal top spacing from PictureSlider */}
            <div className="p-0 m-0 [&>*]:mt-0 [&_*]:mt-0 [&>*]:pt-0 [&_*]:pt-0 -translate-y-1">
              <PictureSlider />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#f5e6e6] rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#500000]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Organization</p>
                  <p className="text-sm font-bold text-gray-800">Student led Finance Org</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>



        {/* Stats Section */}
        <div className="pb-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <StatBoxSection />
          </motion.div>
        </div>

        {/* Programs & Events Timeline Section */}
        <div className="bg-gray-50 py-16 relative">
          {/* Background pattern (maroon) */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23500000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#800000] to-[#500000] bg-clip-text text-transparent">
                Programs &amp; Events
              </h2>
            </motion.div>

            <Timeline
              heading=""
              items={[
                {
                  title: 'Speaker Series',
                  description:
                    'The SOF Speaker Series aims to provide members with valuable insights, inspiration, and knowledge from industry professionals and Texas A&M Alumni. These sessions help members understand the practical applications of finance principles, gain career advice, and learn about current trends and challenges in the finance industry.',
                  image: '/SS.jpg',
                },
                {
                  title: 'LDP',
                  description:
                    'The Leadership Development Program (LDP) is an 8-week program designed to equip members with the principles and skills to be ethical and effective leaders. The program is rooted in the 12 principles and 4 SOF values: Integrity, Humility, Compassion, and Excellence.',
                  image: '/LDP.jpg',
                },
                {
                  title: 'Socials',
                  description:
                    'SOF TAMU will host a few socials throughout the year. In the fall semester, look out for tailgates and crawfish boil in the spring. We also host other fun events every month!',
                  image: '/Socials.jpg',
                },
                {
                  title: 'Stock Pitch Comp',
                  description:
                    'Every year, SOF and AIC host the annual TAMU stock pitch competition. Texas A&M students will be able to pitch a stock they researched to industry professionals for cash prizes.',
                  image: '/SPC.png',
                },
              ]}
            />
          </div>
        </div>

        <Faq />
      </motion.div>
    </main>
  )
}

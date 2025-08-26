'use client';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut', when: 'beforeChildren', staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

export default function ContactUs() {
  return (
    <main className="min-h-screen bg-white text-black pt-24">
      <Navbar />

      <motion.section
        className="max-w-6xl mx-auto px-6 py-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-4"
          variants={item}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="text-center text-lg text-gray-600 max-w-2xl mx-auto"
          variants={item}
        >
          Connect with us via GroupMe, Instagram, or email. We’d love to hear from you.
        </motion.p>

        {/* Contact Cards */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
        >
          {/* GroupMe */}
          <motion.a
            href="https://groupme.com/join_group/105285993/Dpa3PTgJ"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition"
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                💬
              </div>
              <div>
                <h3 className="text-xl font-semibold">GroupMe</h3>
                <p className="text-gray-600">Join our community chat</p>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-blue-600">
              Join Group <span className="transition group-hover:translate-x-0.5">→</span>
            </div>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/sof.tamu"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition"
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-pink-50 flex items-center justify-center text-2xl">
                📸
              </div>
              <div>
                <h3 className="text-xl font-semibold">Instagram</h3>
                <p className="text-gray-600">@sof.tamu</p>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-pink-600">
              View Profile <span className="transition group-hover:translate-x-0.5">→</span>
            </div>
          </motion.a>

          {/* Email */}
          <motion.a
            href="mailto:aggiesof@gmail.com"
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition"
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">
                ✉️
              </div>
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-gray-600">aggiesof@gmail.com</p>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-emerald-700">
              Send Email <span className="transition group-hover:translate-x-0.5">→</span>
            </div>
          </motion.a>
        </motion.div>

        {/* Names / Chapter */}
        <motion.div className="mt-12 text-center text-gray-700" variants={item}>
          <p>Texas A&amp;M Scholars of Finance Chapter</p>
        </motion.div>
      </motion.section>

      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Texas A&amp;M Scholars of Finance. All rights reserved.
      </footer>
    </main>
  );
}

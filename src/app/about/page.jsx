'use client';

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';


const officers = [
  { name: 'Bhuvan Siddaveerappa', classYear: '’26', role: 'President and Co-CIO of Maroon Fund', img: '/bhuvan.jpeg' },
  { name: 'Dhruv Datta', classYear: '’27', role: 'Co-CIO of Maroon Fund', img: '/dhruv.png' },
  { name: '', classYear: '’27', role: 'SAW Director',     img: '/officers/kiyan.jpg' },
  { name: '', classYear: '’26', role: 'Treasurer',          img: '/officers/ryan.jpg' },
];

export default function About() {
  return (
    <main className="min-h-screen bg-white text-black pt-20">
      <Navbar />

      <motion.section
        className="max-w-7xl mx-auto px-6 py-14"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 font-serif text-[#500000]">
          Officer Team
        </h1>

        {/* Grid of officers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 place-items-center">
          {officers.map((o) => (
            <div key={o.name} className="flex flex-col items-center text-center">
              <img
                src={o.img}
                alt={o.name}
                className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover shadow-lg ring-1 ring-gray-200"
              />
              <div className="mt-6">
                <p className="text-xl font-semibold">
                  {o.name} <span className="font-normal">{o.classYear}</span>
                </p>
                <p className="mt-3 text-lg text-gray-700">{o.role}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

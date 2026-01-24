'use client';

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';


const officers = [
    //{ name: 'Bhuvan Siddaveerappa', classYear: '’26', role: 'President and Co-CIO of Maroon Fund', img: '/bhuvan.jpeg' },
    { name: 'Dhruv Datta', classYear: '’27', role: 'Co-CIO', img: '/dhruv.png' },
    { name: 'Owen Conkey', classYear: '’29', role: 'Co-CIO', img: '/owen.jpeg' },
    { name: 'Landry Taylor', classYear: '’29', role: 'Co-Director of Quant Team',     img: '/landry.png' },
    { name: 'Diego Cancino', classYear: '’29', role: 'Co-Director of Quant Team',     img: '/diego.png' },
  ];

const pmTeam = [
  { name: 'Tulsi Rampalli', classYear: '’2X', role: 'PM', img: '/mfphoto.jpeg' },
  { name: 'Thaily Jinuntuya', classYear: '’2X', role: 'PM', img: '/mfphoto.jpeg' },
  { name: 'Jeremial Fernandez', classYear: '’2X', role: 'PM', img: '/mfphoto.jpeg' },
  { name: 'Leyton Blankenburg', classYear: '’29', role: 'PM', img: '/mfphoto.jpeg' },
  { name: 'Ethan Cung', classYear: '’29', role: 'PM', img: '/mfphoto.jpeg' },
];
  
  export default function About() {
    const [activeTab, setActiveTab] = useState('equities');
    const tabs = [
      { id: 'equities', label: 'Equities' },
      { id: 'quantitative', label: 'Quantitative' },
    ];

    return (
      <main className="min-h-screen bg-white text-black pt-20">
        <Navbar />
  
      <motion.section
        className="relative max-w-6xl mx-auto px-6 pt-8 pb-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/mfphoto.jpeg"
          alt=""
          className="absolute left-1/2 top-0 -translate-x-1/2 w-screen max-w-none h-96 md:h-[28rem] object-cover opacity-15"
        />
        <div className="flex flex-col items-center justify-center">
          <img
            src="/maroon-fund-logo-transparent.png"
            alt="Maroon Fund logo"
            className="w-72 h-72 md:w-[22rem] md:h-[22rem] object-contain opacity-90"
          />

          {/*
          <h1 className="mt-0 text-5xl md:text-6xl font-extrabold text-center font-serif text-[#500000]">
            Maroon Fund
          </h1>
          */}

          <div className="flex flex-col gap-0 mt-32">
            <p className="text-[28px] md:text-[32px] leading-[1.35] text-black font-semibold tracking-normal max-w-5xl mx-auto text-center">
              Student-Led investment club at Texas A&amp;M that manages $70,000 in university-allocated capital.
              We teach students how to invest in public equities and build quantitative models from the ground up.
            </p>
          </div>
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 font-serif text-[#500000]">
          Application
        </h1>
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg md:text-xl font-semibold text-[#800000]">
            Deadline is February 2, 2026!
          </p>
          <Link href="https://forms.gle/PpwFta8Ln9bszhNP6">
            <button
              type="button"
              className="box-border h-12 px-6 bg-gradient-to-r from-[#800000] to-[#500000] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply to Maroon Fund
            </button>
          </Link>
        </div>
      </section>

      <motion.section
        className="max-w-7xl mx-auto px-6 py-14"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 font-serif text-[#500000]">
          Executive Leadership
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

      <section className="max-w-7xl mx-auto px-6 pt-4 pb-6">
        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#800000] to-[#500000] text-white shadow'
                  : 'border border-[#500000] text-[#500000] hover:bg-[#fdf5f5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {activeTab === 'equities' && (
        <section className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 font-serif text-[#500000]">
            Equities
          </h1>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 items-start w-full max-w-none">
            <img
              src="/Equitiesplaceholder.jpeg"
              alt="Equities team placeholder"
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg order-2 md:order-1"
            />
            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 font-semibold text-left order-1 md:order-2">
              The Equities Team sources, analyzes, and manages public equity investments for the student-run fund.
              Members conduct fundamental and quantitative analysis, build valuation models, and develop high-conviction
              investment theses across sectors. The team presents trade ideas, monitors portfolio positions, and adjusts
              exposures based on earnings, market conditions, and risk considerations, operating in a structure modeled
              after professional hedge funds.
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#500000] underline underline-offset-4">
              PM Team
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 place-items-center">
            {pmTeam.map((member, index) => {
              const isLast = index === pmTeam.length - 1;
              return (
                <div
                  key={`${member.name}-${index}`}
                  className={`flex flex-col items-center text-center ${
                    isLast ? 'sm:col-span-2 lg:col-start-2 lg:col-span-2 justify-self-center' : ''
                  }`}
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover shadow-lg ring-1 ring-gray-200"
                  />
                  <div className="mt-6">
                    <p className="text-xl font-semibold">
                      {member.name} <span className="font-normal">{member.classYear}</span>
                    </p>
                    <p className="mt-3 text-lg text-gray-700">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#500000] underline underline-offset-4">
              Pitch Decks
            </h2>
          </div>
        </section>
      )}

      {activeTab === 'quantitative' && (
        <section className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 font-serif text-[#500000]">
            Quantitative
          </h1>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[16rem_1fr] items-start gap-8 md:gap-x-0 w-full">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#500000] underline underline-offset-4">PM</h2>
              <img
                src="/jjp.png"
                alt="Quantitative team placeholder"
                className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover shadow-lg ring-1 ring-gray-200"
              />
              <div className="text-center">
                <p className="text-xl font-semibold">
                  Joey Paul <span className="font-normal">’29</span>
                </p>
                <p className="mt-3 text-lg text-gray-700">PM</p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 max-w-xl md:pl-32">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#500000] underline underline-offset-4">Models</h2>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-700 text-left font-semibold">
                A dual model trading system that uses machine learning to predict buy and sell opportunities in stock
                trading. The buy side model identifies entry opportunities during price dips, while the sell side model
                identifies exit opportunities near price peaks.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 font-serif text-[#500000]">
          Investor Letters
        </h1>
      </section>

      </main>
    );
  }
  
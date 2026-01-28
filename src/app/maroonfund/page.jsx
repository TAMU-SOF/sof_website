'use client';

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';


const officers = [
    //{ name: 'Bhuvan Siddaveerappa', classYear: '’26', role: 'President and Co-CIO of Maroon Fund', img: '/bhuvan.jpeg' },
    { name: 'Dhruv Datta', classYear: '’27', role: 'Co-Chief Investment Officer', img: '/dhruv.png', linkedin: 'https://www.linkedin.com/in/dhruv-datta123/' },
    { name: 'Owen Conkey', classYear: '’29', role: 'Co-Chief Investment Officer', img: '/owen.jpeg', linkedin: 'https://www.linkedin.com/in/owen-conkey/' },
    { name: 'Landry Taylor', classYear: '’29', role: 'Co-Director of Quant Team',     img: '/landry.png', linkedin: 'https://www.linkedin.com/in/landry-taylor-9143bb301/' },
    { name: 'Diego Cancino', classYear: '’29', role: 'Co-Director of Quant Team',     img: '/diego.png', linkedin: 'https://www.linkedin.com/in/diego-cancino-92a3a0106/' },
  ];

const pmTeam = [
  { name: 'Tulsi Rampalli', classYear: '’27', role: 'Portfolio Manager', img: '/mfphoto.jpeg', linkedin: 'https://www.linkedin.com/in/tulsi-rampalli/' },
  { name: 'Thaily Jinuntuya', classYear: '’26', role: 'Portfolio Manager', img: '/mfphoto.jpeg', linkedin: 'https://www.linkedin.com/in/thaily-jinuntuya-6437262a9/' },
  { name: 'Jeremial Fernandez', classYear: '’29', role: 'Portfolio Manager', img: '/mfphoto.jpeg', linkedin: 'https://www.linkedin.com/in/jeremial-fernandez-123456789/' },
  { name: 'Leyton Blankenburg', classYear: '’29', role: 'Portfolio Manager', img: '/mfphoto.jpeg', linkedin: 'https://www.linkedin.com/in/leytonblankenburg/' },
  { name: 'Ethan Cung', classYear: '’29', role: 'Portfolio Manager', img: '/mfphoto.jpeg', linkedin: 'https://www.linkedin.com/in/ethancung/' },
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
          className="absolute left-1/2 top-0 -translate-x-1/2 w-screen max-w-none h-72 md:h-[22rem] object-cover opacity-15"
        />
        <div className="flex flex-col items-center justify-center">
          <img
            src="/maroon-fund-logo-transparent.png"
            alt="Maroon Fund logo"
            className="w-60 h-60 md:w-[18rem] md:h-[18rem] object-contain opacity-90"
          />

          {/*
          <h1 className="mt-0 text-5xl md:text-6xl font-extrabold text-center font-serif text-[#500000]">
            Maroon Fund
          </h1>
          */}

          <div className="flex flex-col gap-0 mt-24">
            <p className="text-[23px] md:text-[27px] leading-[1.3] text-black font-semibold tracking-normal max-w-5xl mx-auto text-center">
              Student-Led investment club at Texas A&amp;M that manages $70,000 in university-allocated capital.
              We teach students how to invest in public equities and build quantitative models from the ground up.
            </p>
          </div>
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 font-sans text-[#500000]">
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 font-sans text-[#500000]">
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
                  <a href={o.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {o.name}
                  </a> <span className="font-normal">{o.classYear}</span>
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
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 font-sans text-[#500000]">
            Equities
          </h1>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 items-start w-full max-w-none">
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
          <div className="mt-10 flex flex-col items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#500000] underline underline-offset-4">
              Portfolio Manager Team
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 place-items-center">
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
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {member.name}
                      </a> <span className="font-normal">{member.classYear}</span>
                    </p>
                    <p className="mt-3 text-lg text-gray-700">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#500000] underline underline-offset-4">
              


            </h2>
          </div>
        </section>
      )}

      {activeTab === 'quantitative' && (
        <section className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 font-sans text-[#500000]">
            Quantitative
          </h1>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[16rem_1fr] items-start gap-8 md:gap-x-0 w-full">
            <div className="flex flex-col items-center gap-4">

              <img
                src="/jjp.png"
                alt="Joey Profile"
                className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover shadow-lg ring-1 ring-gray-200"
              />
              <div className="text-center">
                <p className="text-xl font-semibold">
                  <a href="https://www.linkedin.com/in/joeyjosephpaul23/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Joey Paul
                  </a> <span className="font-normal">’29</span>
                </p>
                <p className="mt-3 text-lg text-gray-700">Portfolio Manager</p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 max-w-5xl md:pl-32">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#500000] underline underline-offset-4">Models</h2>
              <ol className="mt-4 list-[upper-roman] pl-6 space-y-4 marker:font-semibold">
                <li>
                    <p className="text-lg md:text-xl font-semibold leading-relaxed text-gray-700">
                    Dip Detection Model
                    </p>
                    <p className="mt-2 text-lg md:text-xl leading-relaxed text-gray-700">
                        A dual model trading system that uses machine learning to predict buy and sell opportunities in stock
                        trading. The buy side model identifies entry opportunities during price dips, while the sell side model
                        identifies exit opportunities near price peaks. Our portfolio analysis is powered by the <a href="https://www.alphavantage.co/" style={{ color: 'blue', textDecoration: 'underline' }}>Alpha Vantage</a> Open-Access Stock Market API.
                    </p>
                </li>
                <li>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-semibold">
                    Porfolio Allocation Algorithm
                    </p>
                    <p className="mt-2 text-lg md:text-xl leading-relaxed text-gray-700">
                        An algorithm that allocates capital to trades based on confidence of returns to allow for optimal risk-adjusted returns.
                    </p>
                </li>
                <li>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-semibold">
                    Quantile Regression Neural Network
                    </p>
                    <p className="mt-2 text-lg md:text-xl leading-relaxed text-gray-700">
                        LSTM (Long Short-Term Memory) quantile regression model that predicts price distributions, not just point estimate, enabling probalistic trading strategies and options market analysis.
                    </p>
                </li>
              </ol>
            </div>
          </div>
        </section>
      )}

    <section className="max-w-7xl mx-auto px-6 py-10">
    <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 font-sans text-[#500000]">
        Portfolio
    </h1>
    <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSTQ0JhXbgXZhFQxaUhkx3pktXoVaJoWhaQyJR17e0NpxfPJrnSf9xOEsPIBEo67g/pubhtml?gid=557789898&amp;single=true&amp;widget=true&amp;headers=false"
        className="w-full h-full"
        loading="lazy"
        title="Portfolio Spreadsheet"
        />
    </div>
    </section>

      </main>
    );
  }
  
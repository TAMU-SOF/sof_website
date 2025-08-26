'use client'
import Navbar from '@/components/Navbar'

export default function GoogleResearch() {
  return (
    <main className="min-h-screen bg-white text-black pt-28">
      <Navbar/>

      <div className="max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          UNH Equity Research Report
        </h2>

        <div className="flex justify-center mt-8">
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vR6h0mkk1plyUb5Fi9treuy5wl1KkJ50cEA3vr8VsYyKgJ5TWcjosadllqu8kcxAh0AGUDJ3DW0r-n5/pubembed?start=true&loop=false&delayms=15000"
            width="960"
            height="569"
            allowFullScreen
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>
    </main>
  )
}

'use client'
import Navbar from '@/components/Navbar'

export default function GoogleResearch() {
  return (
    <main className="min-h-screen bg-white text-black pt-28">

      <Navbar/>

      {/* Google Research Content */}
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">ASML Equity Research Report</h2>
        
        {/* PowerPoint Embed */}
        <div className="flex justify-center mt-8">
          <iframe
            src="/public_reports/ASML_Equity_Research_Report.pdf"
            width="960"
            height="700"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>

      </div>
    </main>
  )
}

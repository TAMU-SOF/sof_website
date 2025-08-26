'use client'
import Navbar from '@/components/Navbar'

export default function GoogleResearch() {
  return (
    <main className="min-h-screen bg-white text-black pt-28">

      <Navbar/>

      {/* Google Research Content */}
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Google Equity Research Report</h2>
        
        {/* PowerPoint Embed */}
        <div className="flex justify-center mt-8">
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vQdOpAsT5tgAOufY22keF0by1LFKutduj_lRINUmQwiKdcoovrL8fcS89DzAULlOzt4u7N3QS3kU7E4/pubembed?start=true&loop=true&delayms=15000"
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

'use client'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function FundVsSP500Chart() {
  const [chartData, setChartData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/sheet/chartdata')
      .then(res => res.json())
      .then(data => {
        
        const rows = data.rows
        console.log("RAW ROWS:", rows)
        const dates = rows.map(row => row[0])
        const fundValues = rows.map(row => parseFloat(row[1]))
        const spValues = rows.map(row => parseFloat(row[2]))

        console.log("spValues:", spValues)

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'B.D. Sterling Fund',
              data: fundValues,
              borderColor: 'rgb(0, 106, 11)',
              tension: 0.3
            },
            {
              label: 'S&P500',
              data: spValues,
              borderColor: 'rgb(195, 0, 0)',
              tension: 0.3
            }
          ]
        })
      })
      .catch(err => {
        console.error('Chart data fetch failed:', err)
        setError(err.message)
      })
  }, [])

  if (error) return <p className="text-red-600">Error: {error}</p>
  if (!chartData) return <p>Loading chart…</p>

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200 w-full">
      <Line data={chartData} />
    </div>
  )
}

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface CryptoChartProps {
  data: number[]
}

const CryptoChart: React.FC<CryptoChartProps> = ({ data }) => {
  const labels = [
    '1:00 PM',
    '4:00 PM',
    '7:00 PM',
    '10:00 PM',
    '1:00 AM',
    '4:00 AM',
    '7:00 AM',
    '10:00 AM',
  ]

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Prix de la cryptomonnaie',
        data,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolution du prix de la cryptomonnaie',
      },
    },
  }

  return <Line data={chartData} options={options} />
}

export default CryptoChart

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
  const labels = ['7 days', '24h', '1h']

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

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface CryptoChartProps {
  labels: string[];
  data: number[];
}

const CryptoChart: React.FC<CryptoChartProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Preço da Criptomoeda',
        data,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolução do Preço da Criptomoeda',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default CryptoChart;

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DailySalesChartProps {
  data: Array<{
    date: string;
    sales: number;
  }>;
}

export const DailySalesChart: React.FC<DailySalesChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }),
    datasets: [
      {
        label: 'Ventas Diarias',
        data: data.map(item => item.sales),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `€${value.toLocaleString()}`
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}; 
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategorySalesChartProps {
  data: Array<{
    name: string;
    sales: number;
  }>;
}

export const CategorySalesChart: React.FC<CategorySalesChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.sales),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Ventas por Categoría
        </Typography>
        <Doughnut data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}; 
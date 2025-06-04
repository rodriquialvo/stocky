import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface TopSellersChartProps {
  data: Array<{
    name: string;
    sales: number;
  }>;
}

export const TopSellersChart: React.FC<TopSellersChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 100,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis
          dataKey="name"
          type="category"
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number) => [`€${value}`, 'Ventas']}
        />
        <Bar
          dataKey="sales"
          fill="#82ca9d"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}; 
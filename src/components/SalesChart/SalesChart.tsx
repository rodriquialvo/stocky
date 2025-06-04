import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface SalesChartProps {
  data: Array<{
    date: string;
    sales: number;
  }>;
}

export const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'd MMM', { locale: es });
  };

  const formatTooltipDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'd MMMM yyyy', { locale: es });
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate}
        />
        <YAxis />
        <Tooltip
          labelFormatter={formatTooltipDate}
          formatter={(value: number) => [`€${value}`, 'Ventas']}
        />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}; 
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const demoData = [
  { label: 'Jan', series1: 30, series2: 20, series3: 10 },
  { label: 'Feb', series1: 40, series2: 30, series3: 20 },
  { label: 'Mar', series1: 35, series2: 25, series3: 15 },
  { label: 'Apr', series1: 50, series2: 40, series3: 30 },
  { label: 'May', series1: 45, series2: 35, series3: 25 },
];

const StackedAreaChartDemo = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Stacked Area Chart</h2>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={demoData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="series1" stackId="1" stroke="#3b82f6" fill="#dbeafe" />
          <Area type="monotone" dataKey="series2" stackId="1" stroke="#10b981" fill="#d1fae5" />
          <Area type="monotone" dataKey="series3" stackId="1" stroke="#f43f5e" fill="#fecdd3" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedAreaChartDemo;

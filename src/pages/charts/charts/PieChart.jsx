import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const renderCustomizedLabel = ({ cx, cy, innerRadius, midAngle, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      dominantBaseline="central"
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      x={x}
      y={y}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SimplePieChart = () => (
  <ResponsiveContainer height={200} width="100%">
    <PieChart>
      <Pie
        cx="50%"
        cy={100}
        data={data}
        dataKey="value"
        fill="#8884d8"
        label={renderCustomizedLabel}
        labelLine={false}
        outerRadius={80}
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
);

export default SimplePieChart;

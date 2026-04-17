import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SimpleBarChart = ({ data }) => (
  <ResponsiveContainer height={300} width="100%">
    <BarChart data={data} height={300} margin={{ top: 20, left: -10 }} width={600}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis orientation="left" stroke="#f3c363" yAxisId="left" />
      <YAxis orientation="right" stroke="#eb3349" yAxisId="right" />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#f3c363" yAxisId="left" />
      <Bar dataKey="uv" fill="#eb3349" yAxisId="right" />
    </BarChart>
  </ResponsiveContainer>
);

SimpleBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      uv: PropTypes.number,
      pv: PropTypes.number,
    })
  ).isRequired,
};

export default SimpleBarChart;

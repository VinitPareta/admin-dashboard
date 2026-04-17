import React from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const renderTooltipContent = ({ label, payload = [] }) => {
  const total = payload.reduce((result, entry) => result + entry.value, 0);

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} (${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PercentAreaChart = ({ data }) => (
  <ResponsiveContainer height={300} width="100%">
    <AreaChart data={data} margin={{ top: 20, left: -15 }} stackOffset="expand">
      <XAxis dataKey="name" />
      <YAxis tickFormatter={toPercent} />
      <Tooltip content={renderTooltipContent} />
      <Area dataKey="uv" fill="#f3c363" stackId="1" stroke="#ffffff" type="monotone" />
      <Area dataKey="pv" fill="#1ab394" stackId="1" stroke="#ffffff" type="monotone" />
      <Area dataKey="amt" fill="#5d80f9" stackId="1" stroke="#ffffff" type="monotone" />
    </AreaChart>
  </ResponsiveContainer>
);

PercentAreaChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      uv: PropTypes.number,
      pv: PropTypes.number,
      amt: PropTypes.number,
    })
  ).isRequired,
};

export default PercentAreaChart;

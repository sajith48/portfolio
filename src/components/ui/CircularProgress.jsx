import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-xl border border-[var(--card-border)] shadow-xl !bg-[var(--bg-color)]/90 backdrop-blur-md">
        <p className="text-sm font-bold" style={{ color: payload[0].payload.color }}>
          {payload[0].name}: <span className="text-[var(--color-text)]">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const CircularProgress = ({ easy, medium, hard }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const data = [
    { name: 'Easy', value: easy, color: '#06B6D4' },     // Cyan
    { name: 'Medium', value: medium, color: '#F59E0B' }, // Amber
    { name: 'Hard', value: hard, color: '#EF4444' },     // Red
  ];

  // If completely zero, show a placeholder
  if (!easy && !medium && !hard) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-[var(--card-border)] border-dashed opacity-50" />
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full h-full min-h-[200px] relative">
      {isInView && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationBegin={200}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          </PieChart>
        </ResponsiveContainer>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xs text-[var(--text-muted)] font-semibold uppercase tracking-widest">Total</span>
        <span className="text-xl font-bold text-[var(--color-text)]">{easy + medium + hard}</span>
      </div>
    </div>
  );
};

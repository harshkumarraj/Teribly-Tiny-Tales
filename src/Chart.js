import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      // Destroy the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Word Frequency',
              data: data.values,
              backgroundColor: 'rgba(136, 249, 248, 0.6)',
              borderColor: 'rgba(136, 249, 248, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              precision: 0,
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
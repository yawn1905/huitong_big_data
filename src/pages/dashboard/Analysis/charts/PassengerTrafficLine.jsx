import React from 'react';
import { Line } from '@ant-design/charts';
function PassengerTrafficLine({ data = [], options = {} }) {
  const config = {
    data,
    padding: 'auto',
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    xAxis: {
      tickCount: 8,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
    ...options,
  };
  if (!data || !data.length) {
    return null;
  }
  return <Line {...config} />;
}

export default PassengerTrafficLine;

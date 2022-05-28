import React from 'react';
import { RingProgress } from '@ant-design/charts';
function ConversionRateRing({ percent = 0.2 }) {
  const config = {
    height: 60,
    width: 60,
    autoFit: false,
    percent,
    color: ['#f9b11f', '#E8EDF3'],
    innerRadius: 0.7,
    statistic: {
      title: false,
      content: false,
    },
  };
  if (!percent) {
    return null;
  }
  return <RingProgress {...config} />;
}

export default ConversionRateRing;

import React from 'react';
import { RingProgress } from '@ant-design/charts';
function CategoryRingProgress({ data = 0.7, color }) {
  let c = ['#E8EDF3'];
  color ? c.unshift(color) : c.unshift('#5B8FF9');
  const config = {
    height: 100,
    width: 100,
    autoFit: false,
    percent: data,
    color: c,
  };
  return <RingProgress {...config} />;
}

export default CategoryRingProgress;

import React from 'react';
import { Area } from '@ant-design/charts';

function ActivityArea({ data }) {
  const config = {
    data,
    xField: 'time',
    yField: 'sales',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
      update: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  if (!data) {
    return null;
  }
  return <Area {...config} />;
}

export default ActivityArea;

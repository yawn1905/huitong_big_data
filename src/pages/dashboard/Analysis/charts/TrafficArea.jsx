import React, { useEffect } from 'react';
import { Area } from '@ant-design/charts';

function TrafficArea({ data }) {
  const config = {
    data,
    smooth: true,
    xField: 'x',
    yField: 'y',
    xAxis: {
      title: null,
      label: null,
      grid: null,
      line: null,
    },
    yAxis: {
      title: null,
      label: null,
      grid: null,
      line: null,
    },
    // height: 46,
    autoFit: true,
    line: {
      color: '#1890ff',
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
        fillOpacity: 0.5,
      };
    },
    meta: {
      x: {
        alias: '时间',
      },
      y: {
        alias: '访问量',
      },
    },
  };
  if (!data) {
    return null;
  }
  return <Area {...config} />;
}

export default TrafficArea;

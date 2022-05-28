import React from 'react';
import { Bullet } from '@ant-design/charts';

function OperatingActiveBullet({ data }) {
  const renderData = [
    {
      title: '满意度',
      ranges: [90],
      measures: [80],
      target: 85,
    },
  ];
  const config = {
    data: renderData,
    measureField: 'measures',
    rangeField: 'ranges',
    targetField: 'target',
    xField: 'title',
    tooltip: {
      showContent: false,
    },
    label: null,
    size: {
      range: 20,
      target: 30,
    },
    color: {
      range: '#f0efff',
      measure: '#1fc5c5',
      target: '#1fc5c5',
    },
    xAxis: {
      grid: null,
      title: null,
      label: null,
      line: null,
    },
    yAxis: {
      grid: null,
      title: null,
      label: null,
    },
    // 自定义 legend
    legend: false,
  };
  if (!data) {
    return null;
  }
  return <Bullet {...config} />;
}

export default OperatingActiveBullet;

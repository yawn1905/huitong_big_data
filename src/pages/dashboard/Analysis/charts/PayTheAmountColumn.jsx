import React from 'react';
import { Column } from '@ant-design/charts';
function PayTheAmountColumn({ data, options = {} }) {
  const config = {
    data,
    xField: 'x',
    yField: 'y',
    label: null,
    xAxis: {
      title: null,
      label: null,
      grid: null,
    },
    yAxis: {
      grid: null,
      title: null,
      label: null,
    },
    meta: {
      x: {
        alias: '时间',
      },
      y: {
        alias: '笔数',
      },
    },
    ...options,
  };
  if (!data) {
    return null;
  }
  return <Column {...config} />;
}

export default PayTheAmountColumn;

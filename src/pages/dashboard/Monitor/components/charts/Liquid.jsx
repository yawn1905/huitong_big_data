import React, { memo } from 'react';
import { Liquid } from '@ant-design/charts';
function MyLiquid({ data }) {
  const config = {
    percent: data,
    outline: {
      border: 2,
      distance: 2,
    },
    wave: {
      length: 80,
    },
    statistic: {
      content: {
        style: {
          fontSize: '16px',
        },
      },
    },
  };
  return <Liquid {...config} />;
}

export default memo(MyLiquid);

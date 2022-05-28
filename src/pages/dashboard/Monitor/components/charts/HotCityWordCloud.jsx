import React, { memo } from 'react';
import { WordCloud } from '@ant-design/charts';

function HotCityWordCloud({ data }) {
  const config = {
    data,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [4, 16],
      rotation: 0,
    },
    // 返回值设置成一个 [0, 1) 区间内的值，
    // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
    random: () => 0.3,
  };
  return <WordCloud {...config} />;
}

export default memo(HotCityWordCloud);

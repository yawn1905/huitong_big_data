import React, { useRef } from 'react';
import { Gauge } from '@ant-design/charts';

function CouponNuclearEfficiencyGauge({ data = 0.7 }) {
  const ticks = [0, 1 / 4, 2 / 4, 3 / 4, 1];
  const color = ['#6394f8', '#62daac', '#647798', '#f6c022'];
  const graphRef = useRef(null);
  const config = {
    percent: data,
    range: {
      ticks,
      color,
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      title: {
        formatter: ({ percent }) => {
          if (percent < ticks[1]) {
            return '差';
          }

          if (percent < ticks[2]) {
            return '中';
          }

          if (percent < ticks[3]) {
            return '中上';
          }

          return '优';
        },
        style: ({ percent }) => {
          return {
            fontSize: '26px',
            lineHeight: 1,
            color: (() => {
              console.log('percent', percent);
              if (percent > ticks[0] && percent <= ticks[1]) {
                return color[0];
              }

              if (percent > ticks[1] && percent <= ticks[2]) {
                return color[1];
              }

              if (percent > ticks[2] && percent <= ticks[3]) {
                return color[2];
              }

              if (percent > ticks[3] && percent <= ticks[4]) {
                return color[3];
              }
              return color[4];
            })(),
          };
        },
      },
      content: null,
    },
    onReady: (plot) => {
      console.log(plot);
      // graphRef.current = plot;
    },
  };
  // useEffect(() => {

  //   return () => {

  //   }
  // }, [graphRef])
  return <Gauge {...config} />;
}

export default React.memo(CouponNuclearEfficiencyGauge);

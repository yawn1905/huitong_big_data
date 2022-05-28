import React, { useState, useEffect } from 'react';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { message, Statistic, Tooltip, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import moment from 'moment';
import useResponsiveStatus from '@/hooks/useResponsiveStatus';
import { hotCity, detailsOfTheEvent } from '@/services/ant-design-pro/api';
import CovidGridMap from './components/CovidGridMap';
import ActivityArea from './components/charts/ActivityArea';
import CouponNuclearEfficiencyGauge from './components/charts/CouponNuclearEfficiencyGauge';
import CategoryRingProgress from './components/charts/CategoryRingProgress';
import HotCityWordCloud from './components/charts/HotCityWordCloud';
import Liquid from './components/charts/Liquid';
import styles from './index.less';
function Monitor() {
  const [loading, setLoading] = useState(false);
  const responsiveStatusXL = useResponsiveStatus('xl');
  const responsiveStatusMD = useResponsiveStatus('md');
  const [renderDetailsOfTheData, setRenderDetailsOfTheData] = useState([]);
  const [renderHotCityData, setRenderHotCityData] = useState([]);
  const {
    data: detailsOfTheEventResult,
    run: startRealTimeActivity,
    cancel: stopRealTimeActivity,
  } = useRequest(detailsOfTheEvent, {
    defaultParams: { current: 1, pageSize: 24 },
    pollingInterval: 7000,
    onError: (err) => {
      message.error('活动情况预测更新失败');
      console.log(err);
    },
  });
  const { data: hotCityResult } = useRequest(hotCity, {
    onError: (err) => {
      message.error('热门城市更新失败');
      console.log(err);
    },
  });
  const handlerEalTimeActivityMenuClick = ({ key }) => {
    if (key === 'stop') {
      stopRealTimeActivity();
      message.info('暂停更新活动情况预测');
    } else {
      startRealTimeActivity({ current: 1, pageSize: 24 });
      message.success('开始更新活动情况预测');
    }
  };
  useEffect(() => {
    if (hotCityResult && hotCityResult.list) {
      setRenderHotCityData(hotCityResult.list);
    }
  }, [hotCityResult]);
  const realTimeActivityMenu = (
    <Menu onClick={handlerEalTimeActivityMenuClick}>
      <Menu.Item key="stop">暂停</Menu.Item>
      <Menu.Item key="start">继续</Menu.Item>
    </Menu>
  );
  // 数组时间排序
  const sortByTime = (arr) => {
    return arr.sort((a, b) => {
      return (
        moment(`${moment().format('YYYY/MM/DD')} ${a.time}`).valueOf() -
        moment(`${moment().format('YYYY/MM/DD')} ${b.time}`).valueOf()
      );
    });
  };
  useEffect(() => {
    if (detailsOfTheEventResult) {
      setRenderDetailsOfTheData(sortByTime(detailsOfTheEventResult));
    }
  }, [detailsOfTheEventResult]);

  return (
    <div id={styles.Monitor}>
      <div name="blockArea-1">
        <ProCard wrap={responsiveStatusXL} gutter={[24, 24]} ghost>
          <ProCard
            title="活动实时交易情况"
            split={'horizontal'}
            loading={loading}
            headerBordered
            bordered
          >
            <ProCard.Group title="核心指标" wrap={responsiveStatusMD}>
              <ProCard
                colSpan={{
                  xs: 24,
                  sm: 12,
                  md: 6,
                  lg: 6,
                  xl: 6,
                }}
              >
                <Statistic title="今日UV" value={79.0} precision={2} />
              </ProCard>
              <ProCard
                colSpan={{
                  xs: 24,
                  sm: 12,
                  md: 6,
                  lg: 6,
                  xl: 6,
                }}
              >
                <Statistic title="冻结金额" value={112893.0} precision={2} />
              </ProCard>
              <ProCard
                colSpan={{
                  xs: 24,
                  sm: 12,
                  md: 6,
                  lg: 6,
                  xl: 6,
                }}
              >
                <Statistic title="信息完整度" value={93} suffix="/ 100" />
              </ProCard>
              <ProCard
                colSpan={{
                  xs: 24,
                  sm: 12,
                  md: 6,
                  lg: 6,
                  xl: 6,
                }}
              >
                <Statistic title="冻结金额" value={112893.0} />
              </ProCard>
            </ProCard.Group>
            <ProCard style={{ height: '452px' }}>
              <CovidGridMap />
            </ProCard>
          </ProCard>
          <ProCard
            className={styles.rightCard}
            colSpan={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 6 }}
            direction="column"
            gutter={[24, 24]}
            wrap={true}
            ghost
          >
            <ProCard
              loading={loading}
              title="活动情况预测"
              headerBordered
              extra={
                <Dropdown overlay={realTimeActivityMenu} placement="topCenter">
                  <EllipsisOutlined style={{ color: 'rgba(0,0,0,.45)', cursor: 'pointer' }} />
                </Dropdown>
              }
            >
              <StatisticCard
                className={styles['detailsOfTheEvent-StatisticCard']}
                title={<span style={{ color: 'rgba(0,0,0,.45)' }}>目标估计</span>}
                statistic={{
                  value: '有望达到预期',
                }}
                size="small"
                chart={
                  <div style={{ height: '90px' }}>
                    <ActivityArea data={detailsOfTheEventResult} />
                  </div>
                }
              />
            </ProCard>
            <ProCard loading={loading} title="券核效率" headerBordered>
              <div className={styles.GaugeChartWrap}>
                <CouponNuclearEfficiencyGauge />
              </div>
            </ProCard>
          </ProCard>
        </ProCard>
      </div>
      <div name="blockArea-2">
        <ProCard wrap={responsiveStatusXL} gutter={[24, 24]} ghost>
          <ProCard
            title="各品类占比"
            colSpan={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24,
              xl: 12,
            }}
            loading={loading}
            headerBordered
            bordered
          >
            <StatisticCard.Group wrap={responsiveStatusMD}>
              <StatisticCard
                size="small"
                layout="center"
                chart={<CategoryRingProgress data={0.28} />}
              />
              <StatisticCard
                size="small"
                layout="center"
                chart={<CategoryRingProgress data={0.58} color={'#4af3df'} />}
              />
              <StatisticCard
                size="small"
                layout="center"
                chart={<CategoryRingProgress data={0.36} color={'#39c562'} />}
              />
            </StatisticCard.Group>
          </ProCard>
          <ProCard
            title="热门搜索"
            colSpan={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24,
              xl: 6,
            }}
            loading={loading}
            headerBordered
            bordered
          >
            {renderHotCityData && (
              <div style={{ height: '139px' }}>
                <HotCityWordCloud data={renderHotCityData} />
              </div>
            )}
          </ProCard>
          <ProCard
            title="资源剩余"
            colSpan={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24,
              xl: 6,
            }}
            loading={loading}
            headerBordered
            bordered
          >
            <div style={{ height: '140px' }}>
              <Liquid data={0.5} />
            </div>
          </ProCard>
        </ProCard>
      </div>
    </div>
  );
}

export default Monitor;

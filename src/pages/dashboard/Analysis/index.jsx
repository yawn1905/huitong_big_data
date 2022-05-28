import React, { useState, useEffect } from 'react';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import { ExclamationCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Tooltip, message, Space, Tabs, DatePicker, Row, Col, List, Radio, Table } from 'antd';
import { useRequest } from 'umi';
import useResponsiveStatus from '@/hooks/useResponsiveStatus';
import styles from './index.less';
import TrafficArea from './charts/TrafficArea';
import PayTheAmountColumn from './charts/PayTheAmountColumn';
import OperatingActiveBullet from './charts/OperatingActiveBullet';
import ConversionRateRing from './charts/ConversionRateRing';
import PassengerTrafficLine from './charts/PassengerTrafficLine';
import { getFakeAnalysisData, storeSalesRanking } from '@/services/ant-design-pro/api';
const { Statistic } = StatisticCard;
const TrafficAreaMemo = React.memo(TrafficArea);
const PayTheAmountColumnMemo = React.memo(PayTheAmountColumn);
const OperatingActiveBulletMemo = React.memo(OperatingActiveBullet);
function SelectDatePicker() {
  const handlerSelect = (key) => {
    console.log(key);
  };
  const handlerStartPicker = (value, dateString) => {
    console.log(value, dateString);
  };
  return (
    <div id={styles.SelectDatePicker}>
      <Space>
        <Tabs type="card" defaultActiveKey="thisYear" onChange={handlerSelect}>
          <Tabs.TabPane tab="今日" key="today" />
          <Tabs.TabPane tab="本周" key="thisWeek" />
          <Tabs.TabPane tab="本月" key="thisMonth" />
          <Tabs.TabPane tab="本年" key="thisYear" />
        </Tabs>
        <DatePicker.RangePicker format="YYYY-MM-DD" onChange={handlerStartPicker} />
      </Space>
    </div>
  );
}

function Analysis() {
  const [renderData, setRenderedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const responsiveStatusXL = useResponsiveStatus('xl');
  const [tab, setTab] = useState('tab1');
  const [storeSalesRankingData, setStoreSalesRankingData] = useState([]);
  const { data: storeSalesRankingResult } = useRequest(storeSalesRanking);
  // 线上热门搜索Table-columns
  const searchDataTableColumns = [
    {
      title: '排名',
      key: 'index',
      dataIndex: 'index',
    },
    {
      title: '搜索关键词',
      key: 'keyword',
      dataIndex: 'keyword',
    },
    {
      title: '用户数',
      key: 'count',
      dataIndex: 'count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: '周涨幅',
      key: 'range',
      dataIndex: 'range',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.count - b.count,
    },
  ];
  // 销售额类别占比
  const handlerSalesDominationRadio = (e) => {
    console.log(e.target.value);
  };
  // 转化率环形图点击事件tabs
  const handlerTabConversionRateRing = (key) => {
    console.log(key);
  };
  const fetchFakeAnalysisData = async () => {
    setLoading(true);
    try {
      const msg = await getFakeAnalysisData();
      setRenderedData(msg?.data);
    } catch (error) {
      message.error('请求失败，请重试');
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchFakeAnalysisData();
  }, []);
  useEffect(() => {
    storeSalesRankingResult && setStoreSalesRankingData(storeSalesRankingResult);
  }, [storeSalesRankingResult]);
  return (
    <div id={styles.analysis}>
      <div name="blockArea-1">
        <ProCard gutter={[24, 24]} ghost wrap={responsiveStatusXL}>
          <ProCard
            colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 6 }}
            loading={loading}
            size="small"
            layout="center"
            bordered
          >
            <StatisticCard
              title={<span style={{ color: 'rgba(0,0,0,.45)' }}>总销售额</span>}
              extra={
                <Tooltip title="指标说明">
                  <ExclamationCircleOutlined
                    onClick={() => {
                      console.log('click');
                    }}
                    style={{ color: 'rgba(0,0,0,.45)', cursor: 'pointer' }}
                  />
                </Tooltip>
              }
              statistic={{
                value: 126560,
                prefix: '￥',
                description: (
                  <div style={{ height: '46px' }} className={styles.blockArea_1_description}>
                    <Statistic title="周环比" value="12%" trend="up" />
                    <Statistic title="日环比" value="11%" trend="down" />
                  </div>
                ),
              }}
              footer={
                <Statistic
                  value={12423}
                  title="日销售额"
                  prefix="￥"
                  valueStyle={{ color: 'black' }}
                />
              }
            />
          </ProCard>
          <ProCard
            colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 6 }}
            loading={loading}
            layout="center"
            size="small"
            bordered
          >
            <StatisticCard
              title={<span style={{ color: 'rgba(0,0,0,.45)' }}>访问量</span>}
              extra={
                <Tooltip title="指标说明">
                  <ExclamationCircleOutlined
                    onClick={() => {
                      console.log('click');
                    }}
                    style={{ color: 'rgba(0,0,0,.45)', cursor: 'pointer' }}
                  />
                </Tooltip>
              }
              statistic={{
                value: 8846,
              }}
              chart={
                <div style={{ height: '46px' }}>
                  <TrafficAreaMemo data={renderData?.visitData} />
                </div>
              }
              footer={
                <>
                  <Statistic value={1234} title="日访问量" valueStyle={{ color: 'black' }} />
                </>
              }
            />
          </ProCard>
          <ProCard
            colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 6 }}
            loading={loading}
            layout="center"
            size="small"
            bordered
          >
            <StatisticCard
              title={<span style={{ color: 'rgba(0,0,0,.45)' }}>支付笔数</span>}
              extra={
                <Tooltip title="指标说明">
                  <ExclamationCircleOutlined
                    onClick={() => {
                      console.log('click');
                    }}
                    style={{ color: 'rgba(0,0,0,.45)', cursor: 'pointer' }}
                  />
                </Tooltip>
              }
              statistic={{
                value: 8846,
              }}
              chart={
                <div style={{ height: '46px' }}>
                  <PayTheAmountColumnMemo data={renderData?.visitData} />
                </div>
              }
              footer={
                <>
                  <Statistic value={`${60}%`} title="转化率" valueStyle={{ color: 'black' }} />
                </>
              }
            />
          </ProCard>
          <ProCard
            colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 6 }}
            loading={loading}
            layout="center"
            size="small"
            bordered
          >
            <StatisticCard
              title={<span style={{ color: 'rgba(0,0,0,.45)' }}>运营活动效果</span>}
              extra={
                <Tooltip title="指标说明">
                  <ExclamationCircleOutlined
                    onClick={() => {
                      console.log('click');
                    }}
                    style={{ color: 'rgba(0,0,0,.45)', cursor: 'pointer' }}
                  />
                </Tooltip>
              }
              statistic={{
                value: 78,
                suffix: '%',
              }}
              chart={
                <div style={{ height: '46px' }}>
                  <OperatingActiveBulletMemo data={renderData?.visitData} />
                </div>
              }
              footer={
                <div className={styles.blockArea_1_description}>
                  <Statistic title="周同比" value="12%" trend="up" />
                  <Statistic title="日同比" value="11%" trend="down" />
                </div>
              }
            />
          </ProCard>
        </ProCard>
      </div>
      <div name="blockArea-2">
        <ProCard
          loading={loading}
          tabs={{
            tabBarExtraContent: !loading && <SelectDatePicker />,
            activeKey: tab,
            onChange: (key) => {
              setTab(key);
            },
          }}
        >
          <ProCard.TabPane key="tab1" tab="销售额">
            <ProCard colSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 17 }}>
              <div className={styles.chartWrap}>
                <PayTheAmountColumnMemo
                  options={{
                    xAxis: {},
                    yAxis: {},
                  }}
                  data={renderData?.salesData}
                />
              </div>
            </ProCard>
            <ProCard colSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 7 }}>
              <List
                header={<div>门店销售额排名</div>}
                split={false}
                size="small"
                dataSource={storeSalesRankingData.sort((a, b) => b.sales - a.sales)}
                renderItem={(item, index) => (
                  <List.Item>
                    <div className={styles.blockArea_2_list_item}>
                      <div className={styles.blockArea_2_list_item_index_name}>
                        <span
                          className={`${styles.rankingItemNumber} ${
                            index < 3 ? styles.rankingItemNumberActive : ''
                          }`}
                        >
                          {index + 1}
                        </span>
                        {item.storeName}
                      </div>
                      <div className={styles.blockArea_2_list_item_value}>
                        <span>￥</span>
                        <span>{item.sales}</span>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </ProCard>
          </ProCard.TabPane>
          <ProCard.TabPane key="tab2" tab="访问量">
            内容二
          </ProCard.TabPane>
        </ProCard>
      </div>
      <div name="blockArea-3">
        <ProCard gutter={[24, 24]} wrap={responsiveStatusXL} ghost>
          <ProCard
            title="线上热门搜索"
            extra={<EllipsisOutlined />}
            colSpan={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12 }}
            loading={loading}
            headerBordered
          >
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <div className={styles.blockArea_3_StatisticCard_wrap}>
                  <StatisticCard
                    title={<span style={{ color: 'rgba(0,0,0,.45)' }}>搜索用户数</span>}
                    tip={'指标说明'}
                    statistic={{
                      value: '1234',
                      layout: 'vertical',
                      description: <Statistic value={17.1} trend="up" />,
                    }}
                    chart={
                      <div style={{ height: '46px' }}>
                        <TrafficAreaMemo data={renderData?.visitData} />
                      </div>
                    }
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.blockArea_3_StatisticCard_wrap}>
                  <StatisticCard
                    title={<span style={{ color: 'rgba(0,0,0,.45)' }}>人均搜索次数</span>}
                    tip={'指标说明'}
                    statistic={{
                      value: '2.7',
                      layout: 'vertical',
                      description: <Statistic value={26.2} trend="down" />,
                    }}
                    chart={
                      <div style={{ height: '46px' }}>
                        <TrafficAreaMemo data={renderData?.visitData} />
                      </div>
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className={styles.blockArea_3_searchTable_wrap}>
                  <Table
                    rowKey="index"
                    size="small"
                    pagination={{
                      pageSize: 5,
                      showSizeChanger: true,
                    }}
                    columns={searchDataTableColumns}
                    dataSource={renderData?.searchData}
                  />
                </div>
              </Col>
            </Row>
          </ProCard>
          <ProCard
            title="销售额类别占比"
            colSpan={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12 }}
            loading={loading}
            layout="center"
          />
        </ProCard>
      </div>
      <div name="blockArea-4">
        <ProCard loading={loading}>
          <Tabs onTabClick={handlerTabConversionRateRing} size="large">
            {renderData.offlineData &&
              renderData.offlineData.length > 0 &&
              renderData?.offlineData.map((item) => (
                <Tabs.TabPane
                  tab={
                    <StatisticCard
                      chartPlacement="right"
                      statistic={{
                        title: item.name,
                        value: item.cvr * 100,
                        suffix: '%',
                      }}
                      chart={<ConversionRateRing percent={item.cvr} />}
                    />
                  }
                  key={item.name}
                />
              ))}
          </Tabs>
          <PassengerTrafficLine data={renderData?.offlineChartData} />
        </ProCard>
      </div>
    </div>
  );
}

export default Analysis;

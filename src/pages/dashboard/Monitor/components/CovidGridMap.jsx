import React, { useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import {
  HeatmapLayer,
  LayerEvent,
  LineLayer,
  MapboxScene,
  Marker,
  PointLayer,
  PolygonLayer,
  Popup,
} from '@antv/l7-react';

const colors = [
  '#f68c60',
  '#f6ad8f',
  '#732e12',
  '#f7cdbc',
  '#ef632b',
  '#8c4b31',
  '#64483d',
  '#f43e06',
].reverse();

function joinData(geodata, ncovData) {
  const ncovDataObj = {};
  ncovData.forEach((item) => {
    const {
      countryName,
      countryEnglishName,
      currentConfirmedCount,
      confirmedCount,
      suspectedCount,
      curedCount,
      deadCount,
    } = item;
    if (countryName === '中国') {
      if (!ncovDataObj[countryName]) {
        ncovDataObj[countryName] = {
          countryName,
          countryEnglishName,
          currentConfirmedCount: 0,
          confirmedCount: 0,
          suspectedCount: 0,
          curedCount: 0,
          deadCount: 0,
        };
      } else {
        ncovDataObj[countryName].currentConfirmedCount += currentConfirmedCount;
        ncovDataObj[countryName].confirmedCount += confirmedCount;
        ncovDataObj[countryName].suspectedCount += suspectedCount;
        ncovDataObj[countryName].curedCount += curedCount;
        ncovDataObj[countryName].deadCount += deadCount;
      }
    } else {
      ncovDataObj[countryName] = {
        countryName,
        countryEnglishName,
        currentConfirmedCount,
        confirmedCount,
        suspectedCount,
        curedCount,
        deadCount,
      };
    }
  });
  const geoObj = {};
  geodata.features.forEach((feature) => {
    const { name } = feature.properties;
    geoObj[name] = feature.properties;
    const ncov = ncovDataObj[name] || {};
    feature.properties = {
      ...feature.properties,
      ...ncov,
    };
  });
  return geodata;
}

function CovidGridMap() {
  const [data, setData] = useState();
  const [gridData, setGridData] = useState();
  const [filldata, setfillData] = useState();
  const [popupInfo, setPopupInfo] = useState({
    lnglat: [],
    feature: null,
  });
  const fetchData = async () => {
    const [geoData, ncovData, gridData] = await Promise.all([
      fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/e62a2f3b-ea99-4c98-9314-01d7c886263d.json',
      ).then((d) => d.json()),
      // https://lab.isaaclin.cn/nCoV/api/area?latest=1
      fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/55a7dd2e-3fb4-4442-8899-900bb03ee67a.json',
      ).then((d) => d.json()),
      fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/8990e8b4-c58e-419b-afb9-8ea3daff2dd1.json',
      ).then((d) => d.json()),
    ]);
    const worldData = geoData && joinData(geoData, ncovData.results);
    const pointdata = worldData.features.map((feature) => {
      return feature.properties;
    });
    setfillData(worldData);
    setData(pointdata);
    setGridData(gridData);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handlerShowPopup = (args) => {
    setPopupInfo({
      lnglat: args.lngLat,
      feature: args.feature,
    });
  };
  if (!data || !popupInfo || !filldata) return null;
  return (
    <MapboxScene
      map={{
        center: [110.19382669582967, 50.258134],
        pitch: 0,
        style: 'blank',
        zoom: 1,
      }}
      option={{
        logoVisible: false,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {popupInfo && popupInfo.feature && (
        <Popup lnglat={popupInfo.lnglat}>
          <Descriptions column={2} size="small" title={popupInfo.feature.name}>
            <Descriptions.Item label="现有确诊">
              {popupInfo.feature.currentConfirmedCount}
            </Descriptions.Item>
            <Descriptions.Item label="累计确诊">
              {popupInfo.feature.confirmedCount}
            </Descriptions.Item>
            <Descriptions.Item label="治愈">{popupInfo.feature.curedCount}</Descriptions.Item>
            <Descriptions.Item label="死亡">{popupInfo.feature.deadCount}</Descriptions.Item>
          </Descriptions>
        </Popup>
      )}
      {data && [
        <HeatmapLayer
          key={'1'}
          source={{
            data: gridData,
            transforms: [
              {
                type: 'hexagon',
                size: 500000,
                field: 'capacity',
                method: 'sum',
              },
            ],
          }}
          color={{
            values: 'rgb(221,230,238)',
          }}
          shape={{
            values: 'hexagon',
          }}
          style={{
            coverage: 0.7,
            angle: 0.3,
            opacity: 0.8,
          }}
        />,
        <LineLayer
          key={'2'}
          source={{
            data: filldata,
          }}
          size={{
            values: 0.6,
          }}
          color={{
            values: '#aaa', // 描边颜色
          }}
          shape={{
            values: 'line',
          }}
          style={{
            opacity: 1,
          }}
        />,
        <PointLayer
          key={'3'}
          options={{
            name: 'default',
            autoFit: true,
          }}
          source={{
            data,
            parser: {
              type: 'json',
              coordinates: 'centroid',
            },
          }}
          scale={{
            values: {
              confirmedCount: {
                type: 'log',
              },
            },
          }}
          color={{
            field: 'confirmedCount',
            values: (count) => {
              return count > 10000
                ? colors[6]
                : count > 1000
                ? colors[5]
                : count > 500
                ? colors[4]
                : count > 100
                ? colors[3]
                : count > 10
                ? colors[2]
                : count > 1
                ? colors[1]
                : colors[0];
            },
          }}
          shape={{
            values: 'circle',
          }}
          active={{
            option: {
              color: '#0c2c84',
            },
          }}
          size={{
            field: 'confirmedCount',
            values: [0, 20],
          }}
          style={{
            opacity: 0.6,
          }}
        >
          <LayerEvent type="mousemove" handler={handlerShowPopup} />
        </PointLayer>,
        <PointLayer
          key={'4'}
          source={{
            data,
            parser: {
              type: 'json',
              coordinates: 'centroid',
            },
          }}
          color={{
            values: '#eef7f2',
          }}
          shape={{
            field: 'countryName',
            values: 'text',
            callback: (name) => {
              console.log(name);
            },
          }}
          filter={{
            field: 'currentConfirmedCount',
            values: (v) => {
              return v > 500;
            },
          }}
          size={{
            values: 12,
          }}
          style={{
            opacity: 1,
            strokeOpacity: 1,
            strokeWidth: 0,
          }}
        >
          <LayerEvent type="mousemove" handler={handlerShowPopup} />
        </PointLayer>,
      ]}
    </MapboxScene>
  );
}

export default React.memo(CovidGridMap);

import Mock from 'mockjs';
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
const getList = (current = 1, pageSize = 10) => {
  let dataSource = [];
  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    dataSource.push({
      key: Mock.mock('@id'),
      time: Mock.mock('@time'),
      sales: getRandomInt(1000, 10000),
      storeName: `店铺${index}`,
    });
  }
  return dataSource;
};

const getDetailsOfTheEvent = (req, res) => {
  const { current, pageSize } = req.query;
  const dataSource = getList(current, pageSize);
  res.json({
    code: 200,
    data: dataSource,
  });
};
export default {
  'GET /api/detailsOfTheEvent': getDetailsOfTheEvent,
};

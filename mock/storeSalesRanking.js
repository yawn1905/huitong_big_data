const getStoreSalesRanking = (req, res) => {
  res.json({
    code: 200,
    data: [
      {
        storeId: 1,
        storeName: '店铺一',
        sales: 100,
      },
      {
        storeId: 2,
        storeName: '店铺二',
        sales: 200,
      },
      {
        storeId: 3,
        storeName: '店铺三',
        sales: 300,
      },
      {
        storeId: 4,
        storeName: '店铺四',
        sales: 400,
      },
      {
        storeId: 5,
        storeName: '店铺五',
        sales: 500,
      },
      {
        storeId: 6,
        storeName: '店铺六',
        sales: 600,
      },
      {
        storeId: 7,
        storeName: '店铺七',
        sales: 700,
      },
    ],
  });
};
export default {
  'GET /api/storeSalesRanking': getStoreSalesRanking,
};

export const mockdata = {
      cars: [
        {
            id: 101,
            color: "Blue",
            model: "Toyota Corolla",
            chasisNumber: "1234ABCDEF",
            expiryDate: "2019-02-13",
            issueDate: "2018-01-14",
            plateNumber: "123ABC",
            yearOfManufacture: 2002
        },
        {
            chasisNumber: "5TDYK3IO4WQ006854",
            color: "Silver",
            expiryDate: "2019-03-11",
            id: 102,
            issueDate: "2018-02-12",
            model: "Honda Accord",
            plateNumber: "KSF992EF",
            yearOfManufacture: 2010
        }
    ],
    coin: {
      timestamp: 1556,
      name: "ADA",
      price: "0.06981793",
      symbol: "ADAUSDT"
    },
    trades: [
      {
        id: 1,
        userId: 1,
        timestamp: 1562086038,
        boughtTimestamp: 1554038036,
        exchange: "binance",
        boughtCoin: "ADA",
        soldCoin: "USDT",
        pairSymbol: "ADAUSDT",
        averagePrice: "0.06981793",
        boughtCoinAmount: "1000",
        soldCoinAmount: "69.81793"
      }
    ],
    users: [
      {
        id: 1,
        username: 'edwardmolasses',
        holdings: [
          {
            coin: "USD",
            amount: 1000
          },
          {
            coin: "BTC",
            amount: 1
          },
          {
            coin: "ETH",
            amount: 10
          }
        ],
        baseCurrency: 'USD',
        withdrawalPercentage: 5
      }
    ],
    ticker: {
      name: "BTC",
      price: 10000
    }
  };

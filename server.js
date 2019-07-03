import { ApolloServer, gql } from 'apollo-server';
import mapKeys from 'lodash/mapKeys';
import { MvrpAPI } from './datasource';
const contentful = require('contentful-management');

const typeDefs = gql`
  type Car {
    id: Int!
    plateNumber: String!
    color: String!
    model: String!
    chasisNumber: String!
    vehicleStatus: String!
    yearOfManufacture: Int!
    issueDate: String!
    expiryDate: String!
  }

  type Coin {
    timestamp: String!
    name: String!
    price: String!
    symbol: String!
  }

  type Ticker {
    name: String!
    price: Float!
  }

  type Trades {
    id: Int!
    userId: Int!
    timestamp: String!
    boughtTimestamp: String!
    exchange: String!
    pairSymbol: String!
    boughtCoin: String!
    soldCoin: String!
    averagePrice: String!
    boughtCoinAmount: String!
    soldCoinAmount: String!
  }

  type Holding {
    coin: String!
    amount: Float!
  }

  type User {
    id: Int!
    username: String!
    holdings: [Holding]!
    baseCurrency: String!
    withdrawalPercentage: Int!
  }

  type CoinHistorical {
    timestamp: String!
    price: Float!
  }

  type Query {
    car(plateNumber: String!): Car
    cars: [Car]
    coin: Coin
    trades: [Trades]
    user: User
    ticker: Ticker
  }
`;

const resolvers = {
  Query: {
    car: async (root, { plateNumber }, { dataSources }) => {
      const car = await dataSources.mvrpAPI.getACar(plateNumber);
      return mapKeys(car, (value, key) => {
         if (key === 'status') return 'vehicleStatus';
         if (key === 'productionYear' ) return 'yearOfManufacture';
         return key;
      });
    },  
    cars: async (root, args, { dataSources }) => {
      // const cars = await dataSources.mvrpAPI.getAllCars();
      // return cars.map(car => ({...car, vehicleStatus: car.status, yearOfManufacture: car.productionYear}));
      const cars = dataSources.mvrpAPI.getAllCars();
      return cars;
    },
    coin: async (root, { plateNumber }, { dataSources }) => {
      const coin = await dataSources.mvrpAPI.getACoin();
      // const coin = dataSources.mvrpAPI.getACoin();
      return coin;
    },
    trades: async (root, { plateNumber }, { dataSources }) => {
      const trades = await dataSources.mvrpAPI.getAllTrades();
      return trades;
    },
    user: async (root, { plateNumber }, { dataSources }) => {
      const user = await dataSources.mvrpAPI.getAUser();
      return user;
    },
    ticker: async (root, { plateNumber }, { dataSources }) => {
      const ticker = await dataSources.mvrpAPI.getTicker();
      return ticker;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    mvrpAPI: new MvrpAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
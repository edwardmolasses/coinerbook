import { RESTDataSource } from 'apollo-datasource-rest';
import { mockdata } from './mockdata';
const contentful = require('contentful-management');
const https = require('https');
const fetch = require("node-fetch");

const COINMARKETCAP_KEY = process.env.COINMARKETCAP_KEY;

// contentful configuration
const SPACE_ID = process.env.SPACE_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PERSONAL_ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN;
const client = contentful.createClient({
  accessToken: PERSONAL_ACCESS_TOKEN
})

export class MvrpAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://mvrp.herokuapp.com/api/';
  }

  getAllCars() {
    const mockResult = mockdata.cars;
    return mockResult;
  }

  async getACar(plateNumber) {
    const result = await this.get('car', {
      plateNumber
    });

    return result;
  }
  
  getACoin() {
    // return mockdata.coin;
    return client.getSpace(SPACE_ID)
      .then((space) => space.getEntries())
      .then((result) => {
        const items = result.items.map(item => {
          let itemFields = item.fields;
          itemFields.id = item.sys.id;
          return itemFields;
        });
        return {
          timestamp: result.items[0].fields.timestamp["en-US"],
          name: result.items[0].fields.name["en-US"],
          price: result.items[0].fields.data["en-US"].price,
          symbol: result.items[0].fields.timestamp["en-US"]
        };
      })
      .catch((error) => console.log('there was an error'));
  }
  
  getAllTrades() {
    return mockdata.trades;
  }
  
  getAUser() {
    return mockdata.users[0];
  }
  
  getTicker() {
    // return mockdata.ticker;
    const apiUri = "https://api.coingecko.com/api/v3/coins/iota/tickers?exchange_ids=binance";
    return fetch(apiUri, {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(json => {
          return {
              name: json.name,
              price: json.tickers[0].last
          };
      });
  }
};
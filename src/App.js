import React, { Component } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import "./App.css";

const GET_ALL_CARS = gql`
  {
    cars {
      id
      plateNumber
      color
      model
      yearOfManufacture
      chasisNumber
      issueDate
      expiryDate
    }
  }
`;

const GET_ALL_TRADES = gql`
  {
    trades {
      id
      timestamp
      boughtTimestamp
      exchange
      pairSymbol
      boughtCoin
      soldCoin
      averagePrice
      boughtCoinAmount
      soldCoinAmount
    }
  }
`;

const GET_A_CAR = gql`
  {
    car(plateNumber: "KSF992EF") {
      id
      plateNumber
      color
      model
      yearOfManufacture
      chasisNumber
      issueDate
      expiryDate
    }
  }
`;

const GET_A_COIN = gql`
  {
    coin {
      timestamp
      name
      price
      symbol
    }
  }
`;

const GET_A_TICKER = gql`
  {
    ticker {
      name
      price
    }
  }
`;

const GET_A_USER = gql`
  {
    user {
      id
      username
      holdings {
        coin 
        amount
      }
      baseCurrency
      withdrawalPercentage
    }
  }
`;

export const GetACoin = () => (
  <Query query={GET_A_COIN}>
    {({ loading, error, data }) => {
      console.log('GetACoin', data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;

      return (
        <div>
          <p> Name: {data.coin.name} </p>
          <p> Price: {data.coin.price} </p>
        </div>
      );
    }}
  </Query>
);

export const GetATicker = () => (
  <Query query={GET_A_TICKER}>
    {({ loading, error, data }) => {
      console.log('ticker: ', data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;

      return (
        <div>
          <p> Name: {data.ticker.name} </p>
          <p> Price: {data.ticker.price} </p>
        </div>
      );
    }}
  </Query>
);

export const GetACar = () => (
  <Query query={GET_A_CAR}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;

      return (
        <div>
          <p> Color: {data.car.color} </p>
          <p> Year of Manufacture: {data.car.yearOfManufacture} </p>
        </div>
      );
    }}
  </Query>
);

export const GetAllCars = () => (
  <Query query={GET_ALL_CARS}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;
      
      return (
        <div>
          {!loading &&
            data.cars.map(car => (
              <div key={car.id}>
                <p> plateNumber: {car.plateNumber} </p>
                <p> Model: {car.model} </p>
                <p> Year of Manufacture: {car.yearOfManufacture} </p>
              </div>
            ))}
        </div>
      );
    }}
  </Query>
);

export const GetAllTrades = () => (
  <Query query={GET_ALL_TRADES}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;
      
      return (
        <div>
          {!loading &&
            data.trades.map(trade => (
              <div key={trade.id}>
                <p> Exchange: {trade.exchange.toUpperCase()} </p>
                <p> Bought: {trade.boughtCoinAmount} {trade.boughtCoin} @ {trade.averagePrice}</p>
                <p> Cost: {trade.soldCoinAmount} {trade.soldCoin} </p>
              </div>
            ))}
        </div>
      );
    }}
  </Query>
);

export const GetAUser = () => (
  <Query query={GET_A_USER}>
    {({ loading, error, data }) => {
      console.log('GetACoin', data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error...</p>;

      return (
        <div>
          <p>Username: {data.user.username} </p>
          <p>Base: {data.user.baseCurrency} </p>
          <p>Withdrawal Rate: {data.user.withdrawalPercentage}% </p>
          <p><h4>Holdings</h4></p>
          {!loading && data.user.holdings.map(holding => (
            <div key={holding.coin}>
                <p><small>{holding.amount} {holding.coin}</small></p>
             </div>
           ))}
        </div>
      );
    }}
  </Query>
);

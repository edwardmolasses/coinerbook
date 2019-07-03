import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { GetACar, GetAllCars, GetACoin, GetAllTrades, GetAUser, GetATicker } from "./App";

const client = new ApolloClient({
  uri: "https://cryptotradebook.glitch.me/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <h2>GET ALL CARS</h2>
    <GetAllCars />

    <hr />

    <h2>GET CARS</h2>
    <GetACar />

    <hr />

    <h2>GET A COIN</h2>
    <GetACoin />

    <hr />

    <h2>GET TRADES</h2>
    <GetAllTrades />

    <hr />

    <h2>GET A USER</h2>
    <GetAUser />

    <hr />

    <h2>GET A TICKER</h2>
    <GetATicker />
  </ApolloProvider>,
  document.getElementById("root")
);

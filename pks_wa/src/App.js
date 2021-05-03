import React, { Component } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { client } from './GraphQL/ApolloGraphQL'
import AppRouter from './router'





class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <AppRouter />
          <div className="bg"></div>
          <div className="bg bg2"></div>
          <div className="bg bg3"></div>
        </div>
      </ApolloProvider>

    );
  }
}

export default App;

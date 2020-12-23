import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import Routing from "./routing";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "./app.css"

const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <Router>
              <Routing/>
          </Router>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
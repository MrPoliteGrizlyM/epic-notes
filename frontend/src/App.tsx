import { StateProvider } from './utils/state';
import {BrowserRouter as Router} from "react-router-dom";
import Routing from "./routing";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import React from "react";
import "./App.css"
import {initialState, reducer} from "./reducers";

const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache()
});

const App = () => {
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <ApolloProvider client={client}>
                <Router>
                    <Routing/>
                </Router>
            </ApolloProvider>
        </StateProvider>
    );
}

export default App;
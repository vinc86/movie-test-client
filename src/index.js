import React from "react";
import {render} from "react-dom";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/index";

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
,document.getElementById('root'));
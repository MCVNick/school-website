import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration.js";
import reportWebVitals from "./reportWebVitals";
import client from './apolloClient';
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

// Register the service worker
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

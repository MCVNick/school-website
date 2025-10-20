import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const GRAPHQL_URI =
  process.env.REACT_APP_GRAPHQL_URI ||
  (window.location.hostname === "localhost"
    ? "http://localhost:4000/graphql"
    : "https://nicholasmcqueen.com/graphql");

const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URI,
    credentials: "include",
  }),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== "production",
});

export default client;

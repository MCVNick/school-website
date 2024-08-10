// apolloClient.js
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://localhost:4000/graphql", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;

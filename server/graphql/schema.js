// graphql/schema.js
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type ResourceCard {
    id: ID!
    title: String!
    description: String!
    internalLink: String
    externalLink: String
    externalLinkTitle: String
    photo: String
    iframe: String
    type: String!
  }

  type Query {
    getResourceCards: [ResourceCard]
    getResourceCard(id: ID!): ResourceCard
  }

  type Mutation {
    createResourceCard(
      title: String!
      description: String!
      internalLink: String
      externalLink: String
      externalLinkTitle: String
      photo: String
      iframe: String
      type: String!
    ): ResourceCard
  }
`;

module.exports = { typeDefs };

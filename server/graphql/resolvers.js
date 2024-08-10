// graphql/resolvers.js
const {
  getResourceCards,
  getResourceCard,
  createResourceCard,
} = require("../models/resourceCard");

const resolvers = {
  Query: {
    getResourceCards: async () => {
      return await getResourceCards();
    },
    getResourceCard: async (_, { id }) => {
      return await getResourceCard(id);
    },
  },
  Mutation: {
    createResourceCard: async (_, args) => {
      return await createResourceCard(args);
    },
  },
};

module.exports = { resolvers };

// graphql/resolvers.js
const {
  getResourceCards,
  getResourceCard,
  createResourceCard,
} = require("../models/resourceCard");

const { getAnnouncements } = require("../models/announcement");
const { getAssignments } = require("../models/assignment");

const resolvers = {
  Query: {
    getResourceCards: async () => getResourceCards(),
    getResourceCard: async (_, { id }) => getResourceCard(id),
    getAnnouncements: async () => getAnnouncements(),
    getAssignments: async () => getAssignments(),
  },
  Mutation: {
    createResourceCard: async (_, args) => createResourceCard(args),
  },
};

module.exports = { resolvers };

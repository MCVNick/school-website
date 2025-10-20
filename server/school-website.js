require("dotenv").config();

const express = require("express");
const compression = require("compression");
const path = require("path");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const generateSitemap = require("./routes/sitemap");
const setupGzip = require("./utils/gzip");

const EXPRESS_PORT = Number(process.env.SERVER_PORT) || 4000;
const GRAPHQL_PORT = 4001;

async function start() {
  const app = express();
  app.use(compression());

  const buildDir = path.join(__dirname, "../build");
  app.use(express.static(buildDir));
  setupGzip(app);

  app.get("/sitemap.xml", generateSitemap);

  app.use((req, res) => {
    res.sendFile(path.join(buildDir, "index.html"));
  });

  app.listen(EXPRESS_PORT, () => {
    console.log(`🚀 Express server: http://localhost:${EXPRESS_PORT}`);
  });

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port: GRAPHQL_PORT },
  });

  console.log(`📊 GraphQL server: ${url}`);
}

start().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});

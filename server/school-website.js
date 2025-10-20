require("dotenv").config();

const express = require("express");
const compression = require("compression");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const generateSitemap = require("./routes/sitemap");
const setupGzip = require("./utils/gzip");

const PORT = Number(process.env.SERVER_PORT) || 4000;

async function start() {
  const app = express();

  app.use(compression());
  app.use(express.json());

  const buildDir = path.join(__dirname, "../build");
  app.use(express.static(buildDir));

  setupGzip(app);

  app.get("/sitemap.xml", generateSitemap);

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql", gui: false });

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(buildDir, "index.html"));
  });

  app.listen(PORT, () => {
    console.log("The server is running on port", PORT);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

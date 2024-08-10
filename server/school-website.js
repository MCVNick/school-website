const express = require("express");
const { json } = require("express");
const compression = require("compression");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./graphql/schema");
const generateSitemap = require("./routes/sitemap");
const setupGzip = require("./utils/gzip");

require("dotenv").config();
const { SERVER_PORT } = process.env;

const app = express();

// Middleware
app.use(compression());
app.use(json());

// Serve static files
app.use(express.static(`${__dirname}/../build`));
setupGzip(app);

// Sitemap endpoint
app.get("/sitemap.xml", generateSitemap);

// Start the server
async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql", gui: false });

  app.listen(SERVER_PORT, () =>
    console.log("The server is running on port", SERVER_PORT || 3000)
  );

  // Default route
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });
}

startServer();

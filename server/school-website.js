require("dotenv").config();

const express = require("express");
const compression = require("compression");
const path = require("path");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");

const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const generateSitemap = require("./routes/sitemap");
const setupGzip = require("./utils/gzip");

const PORT = Number(process.env.SERVER_PORT) || 4000;

async function start() {
  const app = express();

  app.use(compression());
  app.use(cors());
  app.use(express.json());

  const buildDir = path.join(__dirname, "../build");
  app.use(express.static(buildDir));
  setupGzip(app);

  app.get("/sitemap.xml", generateSitemap);

  // Apollo Server 4 setup
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== "production",
  });

  await apolloServer.start();

  // GraphQL endpoint on /graphql (same server, same port)
  app.post("/graphql", async (req, res) => {
    try {
      const result = await apolloServer.executeOperation(
        {
          query: req.body.query,
          variables: req.body.variables,
        },
        {
          contextValue: { headers: req.headers },
        }
      );

      // Apollo Server 4 response handling
      if (result.body.kind === "single") {
        res.json(result.body.singleResult);
      } else {
        res.status(400).json({ error: "Unexpected response format" });
      }
    } catch (error) {
      console.error("GraphQL Error:", error);
      res.status(500).json({ errors: [{ message: error.message }] });
    }
  });

  // React app catch-all - Express 5 style (MUST be last)
  app.use((req, res) => {
    res.sendFile(path.join(buildDir, "index.html"));
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

start().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});

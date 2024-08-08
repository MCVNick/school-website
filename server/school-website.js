const express = require("express");
const { json } = require("express");
const { ApolloServer } = require("apollo-server-express");
const expressStaticGzip = require("express-static-gzip");
const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");
const compression = require("compression");
const path = require("path");

require("dotenv").config();
const { SERVER_PORT } = process.env;

const app = express();

// Middleware
app.use(compression());
app.use(json());

// Serve static files
app.use(express.static(`${__dirname}/../build`));
app.use(
  `/build/client`,
  expressStaticGzip(`/build/client`, {
    enableBrotli: true,
    customCompressions: [
      {
        encodingName: "deflate",
        fileExtension: "zz",
      },
    ],
    orderPreference: ["br", "gz"],
  })
);

// Sitemap endpoint
let sitemap;
app.get("/sitemap.xml", function (req, res) {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");

  // if we have a cached entry send it
  if (sitemap) {
    res.send(sitemap);
    return;
  }

  try {
    const smStream = new SitemapStream({
      hostname: "https://earlyreader.ai/",
    });
    const pipeline = smStream.pipe(createGzip());

    // pipe your entries or directly write them.
    smStream.write({ url: "/", changefreq: "daily", priority: 1.0 });
    smStream.end();

    // cache the response
    streamToPromise(pipeline).then((sm) => (sitemap = sm));

    // stream write the response
    pipeline.pipe(res).on("error", (e) => {
      throw e;
    });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

// Start the server
const schema = require("./graphql/schema.js");
const server = new ApolloServer({ schema });
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql", gui: false});

  app.listen(
    SERVER_PORT,
    console.log("The server is running on port", SERVER_PORT || 3000)
  );

  // Default route
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });
}
startServer();
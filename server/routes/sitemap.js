const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");

let sitemap;

const generateSitemap = async (req, res) => {
  res.header("Content-Type", "application/xml");
  res.header("Content-Encoding", "gzip");

  if (sitemap) {
    res.send(sitemap);
    return;
  }

  try {
    const smStream = new SitemapStream({
      hostname: "https://nicholasmcqueen.com/",
    });
    const pipeline = smStream.pipe(createGzip());

    smStream.write({ url: "/", changefreq: "daily", priority: 1.0 });
    smStream.write({ url: "/about", changefreq: "daily", priority: 1.0 });
    smStream.write({ url: "/about/philosophy", changefreq: "daily", priority: 0.75 });
    smStream.write({ url: "/contact", changefreq: "daily", priority: 0.5 });
    smStream.write({ url: "/resources", changefreq: "daily", priority: 0.25 });
    smStream.end();

    sitemap = await streamToPromise(pipeline);

    pipeline.pipe(res).on("error", (e) => {
      throw e;
    });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

module.exports = generateSitemap;

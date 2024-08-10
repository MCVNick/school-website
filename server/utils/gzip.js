const expressStaticGzip = require("express-static-gzip");

const setupGzip = (app) => {
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
};

module.exports = setupGzip;

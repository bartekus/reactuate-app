const morgan = require("morgan");

const isDev = process.env.NODE_ENV === "development";

module.exports = app => {
  app.use(morgan(isDev ? "dev" : "combined"));
  // app.use(morgan(':method :referrer :req[header] :res[header] :user-agent'));
};

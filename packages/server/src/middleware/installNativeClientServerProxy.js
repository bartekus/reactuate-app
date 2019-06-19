/* eslint-disable no-console */
const httpProxy = require("http-proxy");

const metroBundler = 8081;

module.exports = function installFrontendServer(app) {
  const httpServer = app.get("httpServer");
  const proxy = httpProxy.createProxyServer({
    target: `http://localhost:${metroBundler}`,
    ws: true,
  });
  proxy.on('error', e => {
    // TODO: Address this
    // if (e.code === 'ECONNREFUSED') {
    //   console.log(`Client on port: ${metroBundler} has disconnected!`);
    // } else  {
    //   console.log("Client on port: ", metroBundler);
    //   console.log("Experianced proxy error:");
    //   console.error(e);
    // }
  });
  app.use((req, res, _next) => {
    proxy.web(req, res, {}, e => {
      console.error(e);
      res.statusCode = 503;
      res.end(
        `Error occurred while proxying to client application - is it running? ${
          e.message
        }`
      );
    });
  });
  httpServer.on("upgrade", (req, socket, head) => {
    proxy.ws(req, socket, head);
  });
};

const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "https://a4929zexaf.apigw.ntruss.com",
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/custom", createProxyMiddleware(proxy));
};

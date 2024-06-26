const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: '${address.backendaddress}',
      changeOrigin: true,
    })
  );
};
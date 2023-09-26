const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/photos',
    createProxyMiddleware({
      target: 'http://moamoa4cut.net',
      changeOrigin: true,
    })
  );
};

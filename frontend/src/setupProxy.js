const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URL,
      changeOrigin: false,
    }),
  );
};

// when you run locally, you need a way to mock the typical validation
// so you must serve the front and backend off of the same port

// a built in feature of createReactApp
// if this exists, it will proxy all requests beginning with /api to whatever 
// port you specify in target (in our case, where our nestjs app is running)

// this allows you to simply serve through one url via a service like ngrok
// only used for developing your integrations, it's recommended to use a 
// technology like k8s which can load balance traffic to a individual port
// hosting front and backend code for your custom Check. 

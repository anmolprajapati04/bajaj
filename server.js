const App = require('./src/app');
const config = require('./src/config/config');

const appInstance = new App();
const app = appInstance.getApp();

// For Vercel deployment
const PORT = config.PORT || 3000;

// Local development
if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${config.NODE_ENV}`);
    console.log(`🔗 Health endpoint: http://localhost:${PORT}/health`);
    console.log(`📧 Official email: ${config.CHITKARA_EMAIL}`);
    console.log(`🤖 AI Service: ${config.GEMINI_API_KEY ? 'Configured' : 'Not configured'}`);
  });

  // Graceful shutdown for local
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });

  module.exports = server;
} else {
  // For Vercel/serverless
  module.exports = app;
}
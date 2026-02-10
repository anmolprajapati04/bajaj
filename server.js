require('dotenv').config();
const App = require('./src/app');
const config = require('./src/config/config');

const appInstance = new App();
const app = appInstance.getApp();

const PORT = config.PORT;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${config.NODE_ENV}`);
  console.log(`🔗 Health endpoint: http://localhost:${PORT}/health`);
  console.log(`📧 Official email: ${config.CHITKARA_EMAIL}`);
  console.log(`🤖 AI Service: ${config.GEMINI_API_KEY ? 'Configured' : 'Not configured'}`);
});

// Graceful shutdown
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

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

module.exports = server;
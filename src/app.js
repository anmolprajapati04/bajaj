const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const SecurityMiddleware = require('./middleware/security');
const ErrorHandler = require('./middleware/errorHandler');
const apiRoutes = require('./routes/api');

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddleware() {
    // Security middleware
    this.app.use(SecurityMiddleware.setupHelmet());
    this.app.use(cors(SecurityMiddleware.corsOptions()));
    this.app.use(SecurityMiddleware.setupRateLimiter());
    
    // Parsing middleware
    this.app.use(express.json({ limit: '10kb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10kb' }));
    
    // Input sanitization
    this.app.use(SecurityMiddleware.sanitizeInput);
    
    // Logging
    if (process.env.NODE_ENV !== 'production') {
      this.app.use(morgan('dev'));
    }
  }

  setupRoutes() {
    // API routes
    this.app.use('/', apiRoutes);
    
    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        message: 'BFHL API Service',
        endpoints: {
          'POST /bfhl': 'Process fibonacci, prime, lcm, hcf, or AI queries',
          'GET /health': 'Check API health status'
        },
        documentation: 'Refer to the API documentation for request/response formats'
      });
    });
  }

  setupErrorHandling() {
    // 404 handler
    this.app.use(ErrorHandler.notFound);
    
    // Global error handler
    this.app.use(ErrorHandler.errorHandler);
  }

  getApp() {
    return this.app;
  }
}

module.exports = App;
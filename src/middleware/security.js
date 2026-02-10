const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('../config/config');

class SecurityMiddleware {
  static setupHelmet() {
    return helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"]
        }
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      }
    });
  }

  static setupRateLimiter() {
    return rateLimit({
      windowMs: config.RATE_LIMIT.windowMs,
      max: config.RATE_LIMIT.max,
      message: {
        is_success: false,
        error: 'Too many requests from this IP, please try again later'
      },
      standardHeaders: true,
      legacyHeaders: false
    });
  }

  static validateApiKey(req, res, next) {
    // This is a placeholder for API key validation if needed
    // For now, we allow all requests as per requirements
    next();
  }

  static corsOptions() {
    return {
      origin: (origin, callback) => {
        if (!origin || config.ALLOWED_ORIGINS.includes(origin) || config.NODE_ENV === 'development') {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: 86400 // 24 hours
    };
  }

  static sanitizeInput(req, res, next) {
    if (req.body) {
      const sanitize = (obj) => {
        Object.keys(obj).forEach(key => {
          if (typeof obj[key] === 'string') {
            obj[key] = obj[key].replace(/[<>]/g, '');
          } else if (Array.isArray(obj[key])) {
            obj[key] = obj[key].map(item => 
              typeof item === 'string' ? item.replace(/[<>]/g, '') : item
            );
          }
        });
      };
      sanitize(req.body);
    }
    next();
  }
}

module.exports = SecurityMiddleware;
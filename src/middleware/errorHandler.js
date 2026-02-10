const { ERROR_CODES } = require('../utils/constants');
const config = require('../config/config');

class ErrorHandler {
  static notFound(req, res, next) {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(ERROR_CODES.NOT_FOUND);
    next(error);
  }

  static errorHandler(err, req, res, next) {
    const statusCode = res.statusCode === 200 ? 
      ERROR_CODES.INTERNAL_SERVER_ERROR : res.statusCode;

    const response = {
      is_success: false,
      error: err.message || 'Internal Server Error'
    };

    // Don't leak error details in production
    if (config.NODE_ENV === 'production' && statusCode === ERROR_CODES.INTERNAL_SERVER_ERROR) {
      response.error = 'Internal Server Error';
    }

    // Log error in development
    if (config.NODE_ENV !== 'production') {
      console.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body
      });
    }

    res.status(statusCode).json(response);
  }

  static asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

module.exports = ErrorHandler;
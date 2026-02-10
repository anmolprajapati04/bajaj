const { ERROR_CODES } = require('../utils/constants');
const ValidationService = require('../services/validationService');

class ValidationMiddleware {
  static validateBFHLRequest(req, res, next) {
    try {
      // Check if request has body
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(ERROR_CODES.BAD_REQUEST).json({
          is_success: false,
          error: 'Request body is required'
        });
      }

      // Schema validation
      const { error } = ValidationService.validateRequestSchema(req.body);
      if (error) {
        return res.status(ERROR_CODES.BAD_REQUEST).json({
          is_success: false,
          error: error.details[0].message
        });
      }

      // Custom validation
      const validationResult = ValidationService.validateRequestBody(req.body);
      if (!validationResult.isValid) {
        return res.status(ERROR_CODES.BAD_REQUEST).json({
          is_success: false,
          error: validationResult.error
        });
      }

      next();
    } catch (error) {
      return res.status(ERROR_CODES.INTERNAL_SERVER_ERROR).json({
        is_success: false,
        error: 'Validation error occurred'
      });
    }
  }

  static validateHealthRequest(req, res, next) {
    // Health endpoint doesn't need request validation
    next();
  }
}

module.exports = ValidationMiddleware;
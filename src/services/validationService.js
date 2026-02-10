const Joi = require('joi');
const { VALIDATION } = require('../utils/constants');
const Helpers = require('../utils/helpers');

class ValidationService {
  static validateRequestSchema(body) {
    const schema = Joi.object({
      fibonacci: Joi.number()
        .integer()
        .min(VALIDATION.MIN_INTEGER)
        .max(VALIDATION.MAX_INTEGER)
        .optional(),
      
      prime: Joi.array()
        .items(Joi.number().integer().min(1).max(VALIDATION.MAX_INTEGER))
        .max(VALIDATION.MAX_ARRAY_LENGTH)
        .optional(),
      
      lcm: Joi.array()
        .items(Joi.number().integer().min(1).max(VALIDATION.MAX_INTEGER))
        .min(1)
        .max(VALIDATION.MAX_ARRAY_LENGTH)
        .optional(),
      
      hcf: Joi.array()
        .items(Joi.number().integer().min(1).max(VALIDATION.MAX_INTEGER))
        .min(1)
        .max(VALIDATION.MAX_ARRAY_LENGTH)
        .optional(),
      
      AI: Joi.string()
        .min(1)
        .max(VALIDATION.MAX_QUESTION_LENGTH)
        .optional()
    }).xor('fibonacci', 'prime', 'lcm', 'hcf', 'AI');

    return schema.validate(body);
  }

  static validateRequestBody(body) {
    const presentKeys = Helpers.getPresentKeys(body);
    
    // Check if exactly one key is present
    if (presentKeys.length !== 1) {
      return {
        isValid: false,
        error: presentKeys.length === 0 ? 
          'Request body must contain exactly one of: fibonacci, prime, lcm, hcf, AI' :
          'Request body must contain only one of: fibonacci, prime, lcm, hcf, AI'
      };
    }

    const key = presentKeys[0];
    const value = body[key];

    // Key-specific validations
    switch (key) {
      case 'fibonacci':
        if (!Number.isInteger(value) || value < 0 || value > VALIDATION.MAX_INTEGER) {
          return {
            isValid: false,
            error: `fibonacci must be an integer between 0 and ${VALIDATION.MAX_INTEGER}`
          };
        }
        break;

      case 'prime':
      case 'lcm':
      case 'hcf':
        if (!Array.isArray(value) || value.length === 0) {
          return {
            isValid: false,
            error: `${key} must be a non-empty array`
          };
        }
        if (!Helpers.validateIntegerArray(value)) {
          return {
            isValid: false,
            error: `${key} must contain only positive integers`
          };
        }
        if (value.length > VALIDATION.MAX_ARRAY_LENGTH) {
          return {
            isValid: false,
            error: `Array length must not exceed ${VALIDATION.MAX_ARRAY_LENGTH}`
          };
        }
        break;

      case 'AI':
        if (typeof value !== 'string' || value.trim().length === 0) {
          return {
            isValid: false,
            error: 'AI must be a non-empty string'
          };
        }
        break;

      default:
        return {
          isValid: false,
          error: `Invalid key: ${key}. Allowed keys: fibonacci, prime, lcm, hcf, AI`
        };
    }

    return { isValid: true };
  }
}

module.exports = ValidationService;
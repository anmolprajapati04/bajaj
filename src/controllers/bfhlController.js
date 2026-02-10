const CalculationService = require('../services/calculationService');
const AIService = require('../services/aiService');
const config = require('../config/config');
const { ERROR_CODES } = require('../utils/constants');

class BFHLController {
  constructor() {
    this.aiService = new AIService();
    this.handleRequest = this.handleRequest.bind(this);
  }

  async handleRequest(req, res) {
    try {
      const body = req.body;
      const key = Object.keys(body)[0];
      const value = body[key];

      let result;
      
      switch (key) {
        case 'fibonacci':
          result = CalculationService.processFibonacci(value);
          break;
        
        case 'prime':
          result = CalculationService.processPrime(value);
          break;
        
        case 'lcm':
          result = CalculationService.processLCM(value);
          break;
        
        case 'hcf':
          result = CalculationService.processHCF(value);
          break;
        
        case 'AI':
          result = await this.aiService.getAIResponse(value);
          break;
        
        default:
          throw new Error(`Unsupported operation: ${key}`);
      }

      res.json({
        is_success: true,
        official_email: config.CHITKARA_EMAIL,
        data: result
      });

    } catch (error) {
      console.error('Controller Error:', error);
      
      let statusCode = ERROR_CODES.INTERNAL_SERVER_ERROR;
      let errorMessage = error.message;

      // Map specific errors to appropriate status codes
      if (error.message.includes('must be') || error.message.includes('Invalid')) {
        statusCode = ERROR_CODES.BAD_REQUEST;
      } else if (error.message.includes('authentication') || error.message.includes('unauthorized')) {
        statusCode = ERROR_CODES.UNAUTHORIZED;
      } else if (error.message.includes('rate limit')) {
        statusCode = ERROR_CODES.TOO_MANY_REQUESTS;
      } else if (error.message.includes('unavailable') || error.message.includes('timeout')) {
        statusCode = ERROR_CODES.SERVICE_UNAVAILABLE;
      }

      res.status(statusCode).json({
        is_success: false,
        error: errorMessage
      });
    }
  }
}

module.exports = BFHLController;
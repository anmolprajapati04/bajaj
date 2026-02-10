const config = require('../config/config');

class HealthController {
  static getHealth(req, res) {
    try {
      // Check critical services
      const healthStatus = {
        is_success: true,
        official_email: config.CHITKARA_EMAIL,
        timestamp: new Date().toISOString(),
        status: 'healthy',
        services: {
          api: 'operational',
          ai_service: config.GEMINI_API_KEY ? 'configured' : 'not_configured'
        }
      };

      res.json(healthStatus);
    } catch (error) {
      res.status(500).json({
        is_success: false,
        error: 'Health check failed'
      });
    }
  }
}

module.exports = HealthController;
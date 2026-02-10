require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  RATE_LIMIT: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
  },
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS ? 
    process.env.ALLOWED_ORIGINS.split(',') : 
    ['http://localhost:3000'],
  CHITKARA_EMAIL: 'anmol1525.be23@chitkara.edu.in' // Replace with your actual email
};

// Validate required environment variables
const requiredVars = ['GEMINI_API_KEY'];
requiredVars.forEach(varName => {
  if (!config[varName]) {
    console.warn(`Warning: ${varName} is not set in environment variables`);
  }
});

module.exports = config;
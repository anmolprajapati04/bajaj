module.exports = {
  ERROR_CODES: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
  },
  
  AI_PROVIDERS: {
    GEMINI: 'gemini',
    OPENAI: 'openai',
    ANTHROPIC: 'anthropic'
  },
  
  VALIDATION: {
    MAX_ARRAY_LENGTH: 100,
    MAX_INTEGER: 1000000,
    MIN_INTEGER: 1,
    MAX_QUESTION_LENGTH: 500
  },
  
  RESPONSE_KEYS: ['fibonacci', 'prime', 'lcm', 'hcf', 'AI']
};
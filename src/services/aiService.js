const axios = require('axios');
const config = require('../config/config');

class AIService {
  constructor() {
    this.apiKey = config.GEMINI_API_KEY;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  async getAIResponse(question) {
    try {
      if (!this.apiKey) {
        throw new Error('Gemini API key not configured');
      }

      const response = await axios.post(
        `${this.baseURL}?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: `Please answer the following question with a single word or short phrase: ${question}`
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        }
      );

      const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('No response from AI service');
      }

      // Extract first word/short phrase
      const singleWordResponse = text.trim().split(/[.,;!?\n]/)[0].trim();
      return singleWordResponse || 'Unknown';

    } catch (error) {
      console.error('AI Service Error:', error.message);
      
      if (error.code === 'ENOTFOUND') {
        throw new Error('AI service unavailable');
      }
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            throw new Error('Invalid AI request');
          case 401:
          case 403:
            throw new Error('AI service authentication failed');
          case 429:
            throw new Error('AI service rate limit exceeded');
          default:
            throw new Error(`AI service error: ${error.response.status}`);
        }
      }
      
      if (error.code === 'ECONNABORTED') {
        throw new Error('AI service timeout');
      }
      
      throw new Error(`AI service error: ${error.message}`);
    }
  }
}

module.exports = AIService;
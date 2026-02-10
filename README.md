# BFHL API Service

A REST API service that handles mathematical calculations and AI queries.

## Features
- POST `/bfhl` - Process fibonacci, prime, LCM, HCF, and AI queries
- GET `/health` - Check API health status
- Robust input validation and error handling
- Security middleware with rate limiting
- AI integration with Google Gemini
- Modular architecture with separation of concerns

## Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- Google Gemini API key

## Setup

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd bfhl-api
npm install
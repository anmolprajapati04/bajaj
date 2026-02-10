const express = require('express');
const router = express.Router();
const BFHLController = require('../controllers/bfhlController');
const HealthController = require('../controllers/healthController');
const ValidationMiddleware = require('../middleware/validation');
const ErrorHandler = require('../middleware/errorHandler');

const bfhlController = new BFHLController();

// POST /bfhl
router.post(
  '/bfhl',
  ValidationMiddleware.validateBFHLRequest,
  ErrorHandler.asyncHandler(bfhlController.handleRequest)
);

// GET /health
router.get(
  '/health',
  ValidationMiddleware.validateHealthRequest,
  ErrorHandler.asyncHandler(HealthController.getHealth)
);

module.exports = router;
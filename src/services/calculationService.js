const Helpers = require('../utils/helpers');

class CalculationService {
  static processFibonacci(n) {
    try {
      return Helpers.generateFibonacci(n);
    } catch (error) {
      throw new Error(`Fibonacci calculation failed: ${error.message}`);
    }
  }

  static processPrime(numbers) {
    try {
      if (!Array.isArray(numbers)) {
        throw new Error('Input must be an array');
      }
      return numbers.filter(num => Helpers.isPrime(num));
    } catch (error) {
      throw new Error(`Prime calculation failed: ${error.message}`);
    }
  }

  static processLCM(numbers) {
    try {
      if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Input must be a non-empty array');
      }
      return Helpers.calculateLCM(numbers);
    } catch (error) {
      throw new Error(`LCM calculation failed: ${error.message}`);
    }
  }

  static processHCF(numbers) {
    try {
      if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error('Input must be a non-empty array');
      }
      return Helpers.calculateHCF(numbers);
    } catch (error) {
      throw new Error(`HCF calculation failed: ${error.message}`);
    }
  }
}

module.exports = CalculationService;
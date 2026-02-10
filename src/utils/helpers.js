class Helpers {
  static generateFibonacci(n) {
    if (!Number.isInteger(n) || n < 0) return [];
    
    const fib = [0, 1];
    for (let i = 2; i <= n; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib.slice(0, n + 1);
  }

  static isPrime(num) {
    if (!Number.isInteger(num) || num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }

  static calculateLCM(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) return 1;
    
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
    
    return numbers.reduce((acc, val) => lcm(acc, val), 1);
  }

  static calculateHCF(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) return 0;
    
    const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
    
    return numbers.reduce((acc, val) => gcd(acc, val), numbers[0]);
  }

  static validateIntegerArray(arr) {
    if (!Array.isArray(arr)) return false;
    if (arr.length === 0) return false;
    return arr.every(num => Number.isInteger(num) && num > 0);
  }

  static getPresentKeys(body) {
    return Object.keys(body).filter(key => 
      body[key] !== undefined && body[key] !== null && body[key] !== ''
    );
  }
}

module.exports = Helpers;
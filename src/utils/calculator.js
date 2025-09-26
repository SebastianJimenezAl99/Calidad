class Calculator {
  /**
   * Suma dos números
   * @param {number} a - Primer número
   * @param {number} b - Segundo número
   * @returns {number} Resultado de la suma
   */
  add (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Los argumentos deben ser números')
    }
    return a + b
  }

  /**
   * Resta dos números
   * @param {number} a - Primer número
   * @param {number} b - Segundo número
   * @returns {number} Resultado de la resta
   */
  subtract (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Los argumentos deben ser números')
    }
    return a - b
  }

  /**
   * Multiplica dos números
   * @param {number} a - Primer número
   * @param {number} b - Segundo número
   * @returns {number} Resultado de la multiplicación
   */
  multiply (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Los argumentos deben ser números')
    }
    return a * b
  }

  /**
   * Divide dos números
   * @param {number} a - Dividendo
   * @param {number} b - Divisor
   * @returns {number} Resultado de la división
   */
  divide (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Los argumentos deben ser números')
    }
    if (b === 0) {
      throw new Error('No se puede dividir entre cero')
    }
    return a / b
  }

  /**
   * Calcula el porcentaje
   * @param {number} value - Valor
   * @param {number} percentage - Porcentaje
   * @returns {number} Resultado del porcentaje
   */
  percentage (value, percentage) {
    if (typeof value !== 'number' || typeof percentage !== 'number') {
      throw new Error('Los argumentos deben ser números')
    }
    return (value * percentage) / 100
  }

  /**
   * Calcula la potencia
   * @param {number} base - Base
   * @param {number} exponent - Exponente
   * @returns {number} Resultado de la potencia
   */
  power (base, exponent) {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
      throw new Error('Los argumentos deben ser números')
    }
    return Math.pow(base, exponent)
  }
}

module.exports = new Calculator()

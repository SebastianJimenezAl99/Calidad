const calculator = require('../../src/utils/calculator')

describe('Calculator', () => {
  describe('add', () => {
    test('should add two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5)
    })

    test('should add negative numbers', () => {
      expect(calculator.add(-2, -3)).toBe(-5)
    })

    test('should add positive and negative numbers', () => {
      expect(calculator.add(5, -3)).toBe(2)
    })

    test('should throw error for non-number inputs', () => {
      expect(() => calculator.add('2', 3)).toThrow('Los argumentos deben ser números')
      expect(() => calculator.add(2, null)).toThrow('Los argumentos deben ser números')
    })
  })

  describe('subtract', () => {
    test('should subtract two numbers', () => {
      expect(calculator.subtract(5, 3)).toBe(2)
    })

    test('should handle negative results', () => {
      expect(calculator.subtract(3, 5)).toBe(-2)
    })

    test('should throw error for non-number inputs', () => {
      expect(() => calculator.subtract('5', 3)).toThrow('Los argumentos deben ser números')
    })
  })

  describe('multiply', () => {
    test('should multiply two numbers', () => {
      expect(calculator.multiply(4, 5)).toBe(20)
    })

    test('should handle zero multiplication', () => {
      expect(calculator.multiply(5, 0)).toBe(0)
    })

    test('should handle negative multiplication', () => {
      expect(calculator.multiply(-4, 5)).toBe(-20)
    })

    test('should throw error for non-number inputs', () => {
      expect(() => calculator.multiply(4, '5')).toThrow('Los argumentos deben ser números')
    })
  })

  describe('divide', () => {
    test('should divide two numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5)
    })

    test('should handle decimal results', () => {
      expect(calculator.divide(7, 2)).toBe(3.5)
    })

    test('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('No se puede dividir entre cero')
    })

    test('should throw error for non-number inputs', () => {
      expect(() => calculator.divide('10', 2)).toThrow('Los argumentos deben ser números')
    })
  })

  describe('percentage', () => {
    test('should calculate percentage correctly', () => {
      expect(calculator.percentage(100, 10)).toBe(10)
    })

    test('should handle decimal percentages', () => {
      expect(calculator.percentage(150, 20)).toBe(30)
    })

    test('should throw error for non-number inputs', () => {
      expect(() => calculator.percentage('100', 10)).toThrow('Los argumentos deben ser números')
    })
  })

  describe('power', () => {
    test('should calculate power correctly', () => {
      expect(calculator.power(2, 3)).toBe(8)
    })

    test('should handle power of zero', () => {
      expect(calculator.power(5, 0)).toBe(1)
    })

    test('should handle negative exponents', () => {
      expect(calculator.power(2, -2)).toBe(0.25)
    })

    test('should throw error for non-number inputs', () => {
      expect(() => calculator.power(2, '3')).toThrow('Los argumentos deben ser números')
    })
  })
})

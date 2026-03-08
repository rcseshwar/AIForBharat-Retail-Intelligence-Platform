import fc from 'fast-check'
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  validateEmail,
  validatePassword,
  sanitizeSQL,
  generateSessionId,
  calculateGrowthRate,
} from '@/lib/utils'

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('should format positive numbers as currency', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
      expect(formatCurrency(0)).toBe('$0.00')
    })

    it('should handle negative numbers', () => {
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56')
    })
  })

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      expect(formatNumber(1234567)).toBe('1,234,567')
      expect(formatNumber(0)).toBe('0')
    })
  })

  describe('formatPercentage', () => {
    it('should format decimals as percentages', () => {
      expect(formatPercentage(0.1234)).toBe('12.3%')
      expect(formatPercentage(1)).toBe('100.0%')
    })
  })

  describe('validateEmail', () => {
    it('should validate correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@domain.com')).toBe(false)
    })

    // Property-based test
    it('should validate email format properties', () => {
      fc.assert(
        fc.property(
          fc.string(),
          (input) => {
            const isValid = validateEmail(input)
            const hasAtSymbol = input.includes('@')
            const hasDot = input.includes('.')
            
            // If valid, must contain @ and .
            if (isValid) {
              expect(hasAtSymbol).toBe(true)
              expect(hasDot).toBe(true)
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const result = validatePassword('StrongPass123')
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject weak passwords', () => {
      const result = validatePassword('weak')
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    // Property-based test for password validation
    it('should enforce password requirements consistently', () => {
      fc.assert(
        fc.property(
          fc.string(),
          (password) => {
            const result = validatePassword(password)
            
            // Check length requirement
            if (password.length < 8) {
              expect(result.errors.some(e => e.includes('8 characters'))).toBe(true)
            }
            
            // Check uppercase requirement
            if (!/[A-Z]/.test(password)) {
              expect(result.errors.some(e => e.includes('uppercase'))).toBe(true)
            }
            
            // Check lowercase requirement
            if (!/[a-z]/.test(password)) {
              expect(result.errors.some(e => e.includes('lowercase'))).toBe(true)
            }
            
            // Check number requirement
            if (!/\d/.test(password)) {
              expect(result.errors.some(e => e.includes('number'))).toBe(true)
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('sanitizeSQL', () => {
    it('should remove dangerous SQL keywords', () => {
      expect(sanitizeSQL('SELECT * FROM users; DROP TABLE users;')).not.toContain('DROP')
      expect(sanitizeSQL('DELETE FROM users WHERE id = 1')).not.toContain('DELETE')
    })

    it('should preserve safe SQL', () => {
      const safeSQL = 'SELECT name, email FROM users WHERE active = true'
      const sanitized = sanitizeSQL(safeSQL)
      expect(sanitized).toContain('SELECT')
      expect(sanitized).toContain('FROM')
      expect(sanitized).toContain('WHERE')
    })

    // Property-based test for SQL sanitization
    it('should never contain dangerous keywords after sanitization', () => {
      fc.assert(
        fc.property(
          fc.string(),
          (input) => {
            const sanitized = sanitizeSQL(input)
            const dangerousKeywords = ['DROP', 'DELETE', 'INSERT', 'UPDATE', 'CREATE', 'ALTER']
            
            dangerousKeywords.forEach(keyword => {
              expect(sanitized.toUpperCase()).not.toContain(keyword)
            })
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('generateSessionId', () => {
    it('should generate unique session IDs', () => {
      const id1 = generateSessionId()
      const id2 = generateSessionId()
      
      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
      expect(id1.length).toBeGreaterThan(0)
    })

    // Property-based test for session ID uniqueness
    it('should generate unique IDs consistently', () => {
      const ids = new Set()
      
      for (let i = 0; i < 1000; i++) {
        const id = generateSessionId()
        expect(ids.has(id)).toBe(false) // Should be unique
        ids.add(id)
      }
    })
  })

  describe('calculateGrowthRate', () => {
    it('should calculate positive growth correctly', () => {
      expect(calculateGrowthRate(120, 100)).toBe(0.2) // 20% growth
    })

    it('should calculate negative growth correctly', () => {
      expect(calculateGrowthRate(80, 100)).toBe(-0.2) // -20% growth
    })

    it('should handle zero previous value', () => {
      expect(calculateGrowthRate(100, 0)).toBe(1) // 100% growth from zero
      expect(calculateGrowthRate(0, 0)).toBe(0) // No change
    })

    // Property-based test for growth rate calculation
    it('should maintain mathematical properties', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 10000 }),
          fc.float({ min: 0.1, max: 10000 }), // Avoid zero for division
          (current, previous) => {
            const growthRate = calculateGrowthRate(current, previous)
            
            // Growth rate should be finite
            expect(Number.isFinite(growthRate)).toBe(true)
            
            // If current > previous, growth should be positive
            if (current > previous) {
              expect(growthRate).toBeGreaterThan(0)
            }
            
            // If current < previous, growth should be negative
            if (current < previous) {
              expect(growthRate).toBeLessThan(0)
            }
            
            // If current === previous, growth should be zero
            if (current === previous) {
              expect(growthRate).toBe(0)
            }
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})
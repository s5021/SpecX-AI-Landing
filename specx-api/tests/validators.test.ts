/**
 * Unit Tests for Validator Helper Functions
 * Day 5: Testing helper functions with Jest
 */

import {
  isValidString,
  isPositiveNumber,
  isBoolean,
  validateItem,
  filterItems,
  formatDate,
  calculateUptime
} from '../src/helpers/validators';
import { Item } from '../src/types';

describe('Validator Helper Functions', () => {
  
  describe('isValidString', () => {
    it('should return true for valid non-empty strings', () => {
      expect(isValidString('hello')).toBe(true);
      expect(isValidString('test string')).toBe(true);
    });

    it('should return false for empty strings', () => {
      expect(isValidString('')).toBe(false);
      expect(isValidString('   ')).toBe(false);
    });

    it('should return false for non-string types', () => {
      expect(isValidString(123)).toBe(false);
      expect(isValidString(null)).toBe(false);
      expect(isValidString(undefined)).toBe(false);
      expect(isValidString({})).toBe(false);
    });
  });

  describe('isPositiveNumber', () => {
    it('should return true for positive numbers', () => {
      expect(isPositiveNumber(1)).toBe(true);
      expect(isPositiveNumber(100.5)).toBe(true);
      expect(isPositiveNumber(0.1)).toBe(true);
    });

    it('should return false for zero and negative numbers', () => {
      expect(isPositiveNumber(0)).toBe(false);
      expect(isPositiveNumber(-1)).toBe(false);
      expect(isPositiveNumber(-100.5)).toBe(false);
    });

    it('should return false for NaN and non-number types', () => {
      expect(isPositiveNumber(NaN)).toBe(false);
      expect(isPositiveNumber('123')).toBe(false);
      expect(isPositiveNumber(null)).toBe(false);
      expect(isPositiveNumber(undefined)).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('should return true for boolean values', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    it('should return false for non-boolean types', () => {
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean(null)).toBe(false);
      expect(isBoolean(undefined)).toBe(false);
    });
  });

  describe('validateItem', () => {
    const validItem: Item = {
      id: 1,
      name: 'Test Item',
      description: 'Test Description',
      category: 'Test Category',
      price: 99.99,
      inStock: true,
      createdAt: '2026-08-10T00:00:00.000Z'
    };

    it('should return true for valid items', () => {
      expect(validateItem(validItem)).toBe(true);
    });

    it('should return false for items with invalid name', () => {
      const invalidItem = { ...validItem, name: '' };
      expect(validateItem(invalidItem)).toBe(false);
    });

    it('should return false for items with invalid price', () => {
      const invalidItem = { ...validItem, price: -10 };
      expect(validateItem(invalidItem)).toBe(false);
    });

    it('should return false for items with invalid inStock', () => {
      const invalidItem = { ...validItem, inStock: 'true' as any };
      expect(validateItem(invalidItem)).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(validateItem(null)).toBe(false);
      expect(validateItem(undefined)).toBe(false);
    });
  });

  describe('filterItems', () => {
    const testItems: Item[] = [
      {
        id: 1,
        name: 'Item 1',
        description: 'Description 1',
        category: 'Electronics',
        price: 100,
        inStock: true,
        createdAt: '2026-08-01T00:00:00.000Z'
      },
      {
        id: 2,
        name: 'Item 2',
        description: 'Description 2',
        category: 'Books',
        price: 50,
        inStock: false,
        createdAt: '2026-08-02T00:00:00.000Z'
      },
      {
        id: 3,
        name: 'Item 3',
        description: 'Description 3',
        category: 'Electronics',
        price: 200,
        inStock: true,
        createdAt: '2026-08-03T00:00:00.000Z'
      }
    ];

    it('should return all items when no filter is applied', () => {
      const filtered = filterItems(testItems, {});
      expect(filtered).toHaveLength(3);
    });

    it('should filter by category', () => {
      const filtered = filterItems(testItems, { category: 'Electronics' });
      expect(filtered).toHaveLength(2);
      expect(filtered.every(item => item.category === 'Electronics')).toBe(true);
    });

    it('should filter by inStock status', () => {
      const filtered = filterItems(testItems, { inStock: true });
      expect(filtered).toHaveLength(2);
      expect(filtered.every(item => item.inStock === true)).toBe(true);
    });

    it('should filter by minimum price', () => {
      const filtered = filterItems(testItems, { minPrice: 100 });
      expect(filtered).toHaveLength(2);
      expect(filtered.every(item => item.price >= 100)).toBe(true);
    });

    it('should filter by maximum price', () => {
      const filtered = filterItems(testItems, { maxPrice: 100 });
      expect(filtered).toHaveLength(2);
      expect(filtered.every(item => item.price <= 100)).toBe(true);
    });

    it('should apply multiple filters', () => {
      const filtered = filterItems(testItems, {
        category: 'Electronics',
        inStock: true,
        minPrice: 50
      });
      expect(filtered).toHaveLength(2);
      expect(filtered.every(item => 
        item.category === 'Electronics' && 
        item.inStock === true && 
        item.price >= 50
      )).toBe(true);
    });
  });

  describe('formatDate', () => {
    it('should return ISO string for current date when no argument', () => {
      const formatted = formatDate();
      expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('should return ISO string for provided date', () => {
      const testDate = new Date('2026-08-10T12:00:00.000Z');
      const formatted = formatDate(testDate);
      expect(formatted).toBe('2026-08-10T12:00:00.000Z');
    });
  });

  describe('calculateUptime', () => {
    it('should return 0 for start time equal to current time', () => {
      const now = Date.now();
      const uptime = calculateUptime(now);
      expect(uptime).toBeGreaterThanOrEqual(0);
      expect(uptime).toBeLessThan(2); // Should be 0 or 1 second
    });

    it('should calculate correct uptime in seconds', () => {
      const fiveSecondsAgo = Date.now() - 5000;
      const uptime = calculateUptime(fiveSecondsAgo);
      expect(uptime).toBeGreaterThanOrEqual(5);
      expect(uptime).toBeLessThan(7); // Allow small margin
    });

    it('should return positive integer', () => {
      const startTime = Date.now() - 10000;
      const uptime = calculateUptime(startTime);
      expect(Number.isInteger(uptime)).toBe(true);
      expect(uptime).toBeGreaterThan(0);
    });
  });

});

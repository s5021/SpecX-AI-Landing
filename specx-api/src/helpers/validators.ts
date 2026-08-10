/**
 * Helper Functions for SpecX API
 * Day 4: Utility functions with TypeScript types
 */

import { Item, ItemQuery } from '../types';

/**
 * Validates if a string is not empty
 */
export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates if a number is positive
 */
export function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && value > 0 && !isNaN(value);
}

/**
 * Validates if a value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Validates an item object
 */
export function validateItem(item: any): item is Item {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'number' &&
    isValidString(item.name) &&
    isValidString(item.description) &&
    isValidString(item.category) &&
    isPositiveNumber(item.price) &&
    isBoolean(item.inStock)
  );
}

/**
 * Filters items based on query parameters
 */
export function filterItems(items: Item[], query: ItemQuery): Item[] {
  let filtered = [...items];

  // Filter by category
  if (query.category && isValidString(query.category)) {
    filtered = filtered.filter(
      item => item.category.toLowerCase() === query.category!.toLowerCase()
    );
  }

  // Filter by stock status
  if (query.inStock !== undefined && isBoolean(query.inStock)) {
    filtered = filtered.filter(item => item.inStock === query.inStock);
  }

  // Filter by minimum price
  if (query.minPrice !== undefined && isPositiveNumber(query.minPrice)) {
    filtered = filtered.filter(item => item.price >= query.minPrice!);
  }

  // Filter by maximum price
  if (query.maxPrice !== undefined && isPositiveNumber(query.maxPrice)) {
    filtered = filtered.filter(item => item.price <= query.maxPrice!);
  }

  return filtered;
}

/**
 * Formats a date to ISO string
 */
export function formatDate(date: Date = new Date()): string {
  return date.toISOString();
}

/**
 * Calculates uptime in seconds
 */
export function calculateUptime(startTime: number): number {
  return Math.floor((Date.now() - startTime) / 1000);
}

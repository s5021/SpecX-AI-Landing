/**
 * TypeScript Interfaces for SpecX API
 * Day 4: Typed API
 */

// Item interface - represents an item in our system
export interface Item {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  inStock: boolean;
  createdAt: string;
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  version: string;
}

export interface ItemsResponse {
  total: number;
  items: Item[];
}

// Request query parameters
export interface ItemQuery {
  category?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

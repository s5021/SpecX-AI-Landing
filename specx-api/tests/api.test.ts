/**
 * Unit Tests for API Endpoints
 * Day 5: Testing Express routes with supertest
 */

import request from 'supertest';
import app from '../src/app';

describe('API Endpoints', () => {

  describe('GET /', () => {
    it('should return welcome message', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Welcome to SpecX API');
      expect(response.body.data).toHaveProperty('welcome');
      expect(response.body.data).toHaveProperty('endpoints');
      expect(response.body.data.endpoints).toBeInstanceOf(Array);
    });

    it('should return structured response with endpoints list', async () => {
      const response = await request(app).get('/');
      
      expect(response.body.data.endpoints).toHaveLength(4);
      expect(response.body.data).toHaveProperty('documentation');
    });
  });

  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('API is running smoothly');
    });

    it('should return health data with required fields', async () => {
      const response = await request(app).get('/health');
      
      expect(response.body.data).toHaveProperty('status');
      expect(response.body.data).toHaveProperty('timestamp');
      expect(response.body.data).toHaveProperty('uptime');
      expect(response.body.data).toHaveProperty('version');
      
      expect(response.body.data.status).toBe('healthy');
      expect(typeof response.body.data.uptime).toBe('number');
      expect(response.body.data.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should return ISO timestamp', async () => {
      const response = await request(app).get('/health');
      
      const timestamp = response.body.data.timestamp;
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('GET /items', () => {
    it('should return all items', async () => {
      const response = await request(app).get('/items');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('items');
      expect(response.body.data.items).toBeInstanceOf(Array);
      expect(response.body.data.total).toBeGreaterThan(0);
    });

    it('should return items with correct structure', async () => {
      const response = await request(app).get('/items');
      
      const firstItem = response.body.data.items[0];
      expect(firstItem).toHaveProperty('id');
      expect(firstItem).toHaveProperty('name');
      expect(firstItem).toHaveProperty('description');
      expect(firstItem).toHaveProperty('category');
      expect(firstItem).toHaveProperty('price');
      expect(firstItem).toHaveProperty('inStock');
      expect(firstItem).toHaveProperty('createdAt');
    });

    it('should filter items by category', async () => {
      const response = await request(app)
        .get('/items')
        .query({ category: 'AI Services' });
      
      expect(response.status).toBe(200);
      expect(response.body.data.items.length).toBeGreaterThan(0);
      expect(response.body.data.items.every(
        (item: any) => item.category === 'AI Services'
      )).toBe(true);
    });

    it('should filter items by inStock status', async () => {
      const response = await request(app)
        .get('/items')
        .query({ inStock: 'true' });
      
      expect(response.status).toBe(200);
      expect(response.body.data.items.every(
        (item: any) => item.inStock === true
      )).toBe(true);
    });

    it('should filter items by minimum price', async () => {
      const response = await request(app)
        .get('/items')
        .query({ minPrice: '200' });
      
      expect(response.status).toBe(200);
      expect(response.body.data.items.every(
        (item: any) => item.price >= 200
      )).toBe(true);
    });

    it('should filter items by maximum price', async () => {
      const response = await request(app)
        .get('/items')
        .query({ maxPrice: '150' });
      
      expect(response.status).toBe(200);
      expect(response.body.data.items.every(
        (item: any) => item.price <= 150
      )).toBe(true);
    });

    it('should apply multiple filters together', async () => {
      const response = await request(app)
        .get('/items')
        .query({
          category: 'AI Services',
          inStock: 'true',
          maxPrice: '300'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.data.items.every((item: any) =>
        item.category === 'AI Services' &&
        item.inStock === true &&
        item.price <= 300
      )).toBe(true);
    });
  });

  describe('GET /items/:id', () => {
    it('should return a specific item by ID', async () => {
      const response = await request(app).get('/items/1');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', 1);
      expect(response.body.data).toHaveProperty('name');
    });

    it('should return 404 for non-existent item', async () => {
      const response = await request(app).get('/items/999');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Item not found');
    });

    it('should return 400 for invalid item ID', async () => {
      const response = await request(app).get('/items/invalid');
      
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid item ID');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');
      
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Route not found');
    });
  });

});

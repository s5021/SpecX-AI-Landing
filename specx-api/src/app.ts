/**
 * Express Application Setup
 * Day 4: TypeScript API with Express
 */

import express, { Application, Request, Response } from 'express';
import { ApiResponse, HealthResponse } from './types';
import { calculateUptime, formatDate } from './helpers/validators';
import itemsRouter from './routes/items';

// Create Express app
const app: Application = express();

// Store start time for uptime calculation
const startTime = Date.now();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add CORS headers for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/**
 * GET /
 * Root endpoint - Welcome message
 */
app.get('/', (req: Request, res: Response) => {
  const response: ApiResponse<{ 
    welcome: string; 
    endpoints: string[];
    documentation: string;
  }> = {
    success: true,
    message: 'Welcome to SpecX API',
    data: {
      welcome: 'SpecX AI - TypeScript API for Day 4 & 5',
      endpoints: [
        'GET / - This welcome message',
        'GET /health - API health status',
        'GET /items - Get all items (with optional filters)',
        'GET /items/:id - Get specific item by ID'
      ],
      documentation: 'https://github.com/s5021/SpecX-AI-Landing'
    }
  };

  res.status(200).json(response);
});

/**
 * GET /health
 * Health check endpoint with system information
 */
app.get('/health', (req: Request, res: Response) => {
  const healthData: HealthResponse = {
    status: 'healthy',
    timestamp: formatDate(),
    uptime: calculateUptime(startTime),
    version: '1.0.0'
  };

  const response: ApiResponse<HealthResponse> = {
    success: true,
    message: 'API is running smoothly',
    data: healthData
  };

  res.status(200).json(response);
});

/**
 * Mount items routes
 */
app.use('/items', itemsRouter);

/**
 * 404 Handler - Route not found
 */
app.use((req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    success: false,
    message: 'Route not found',
    error: `Cannot ${req.method} ${req.originalUrl}`
  };
  res.status(404).json(response);
});

/**
 * Error Handler
 */
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  const response: ApiResponse<null> = {
    success: false,
    message: 'Internal server error',
    error: err.message
  };
  res.status(500).json(response);
});

export default app;

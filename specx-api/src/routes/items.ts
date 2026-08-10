/**
 * Items Routes for SpecX API
 * Day 4: GET /items endpoint with TypeScript types
 */

import express, { Request, Response } from 'express';
import { ApiResponse, ItemsResponse, ItemQuery } from '../types';
import { mockItems } from '../data/mockData';
import { filterItems } from '../helpers/validators';

const router = express.Router();

/**
 * GET /items
 * Returns all items or filtered items based on query parameters
 * 
 * Query parameters:
 * - category: string (optional) - Filter by category
 * - inStock: boolean (optional) - Filter by stock status
 * - minPrice: number (optional) - Minimum price
 * - maxPrice: number (optional) - Maximum price
 */
router.get('/', (req: Request, res: Response) => {
  try {
    // Extract and parse query parameters
    const query: ItemQuery = {
      category: req.query.category as string | undefined,
      inStock: req.query.inStock === 'true' ? true : req.query.inStock === 'false' ? false : undefined,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined
    };

    // Filter items based on query
    const filteredItems = filterItems(mockItems, query);

    // Prepare response
    const response: ApiResponse<ItemsResponse> = {
      success: true,
      message: `Found ${filteredItems.length} items`,
      data: {
        total: filteredItems.length,
        items: filteredItems
      }
    };

    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      message: 'Failed to fetch items',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(errorResponse);
  }
});

/**
 * GET /items/:id
 * Returns a single item by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        message: 'Invalid item ID',
        error: 'ID must be a number'
      };
      return res.status(400).json(errorResponse);
    }

    const item = mockItems.find(item => item.id === id);

    if (!item) {
      const errorResponse: ApiResponse<null> = {
        success: false,
        message: 'Item not found',
        error: `No item with ID ${id} exists`
      };
      return res.status(404).json(errorResponse);
    }

    const response: ApiResponse<typeof item> = {
      success: true,
      message: 'Item found',
      data: item
    };

    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      message: 'Failed to fetch item',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    res.status(500).json(errorResponse);
  }
});

export default router;

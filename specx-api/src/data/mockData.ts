/**
 * Mock Data for SpecX API
 * Sample items for testing
 */

import { Item } from '../types';

export const mockItems: Item[] = [
  {
    id: 1,
    name: 'Azure OpenAI API Access',
    description: 'Enterprise-grade AI language models for intelligent document generation',
    category: 'AI Services',
    price: 299.99,
    inStock: true,
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 2,
    name: 'Azure AI Search',
    description: 'Vector search and semantic search capabilities for RAG implementation',
    category: 'AI Services',
    price: 199.99,
    inStock: true,
    createdAt: '2026-08-02T10:00:00.000Z'
  },
  {
    id: 3,
    name: 'React Dashboard Template',
    description: 'Professional React component library with TypeScript support',
    category: 'Frontend',
    price: 149.99,
    inStock: true,
    createdAt: '2026-08-03T10:00:00.000Z'
  },
  {
    id: 4,
    name: 'FastAPI Backend Framework',
    description: 'High-performance Python API framework with automatic documentation',
    category: 'Backend',
    price: 0,
    inStock: true,
    createdAt: '2026-08-04T10:00:00.000Z'
  },
  {
    id: 5,
    name: 'Docker Enterprise License',
    description: 'Containerization platform for consistent deployments',
    category: 'DevOps',
    price: 499.99,
    inStock: false,
    createdAt: '2026-08-05T10:00:00.000Z'
  },
  {
    id: 6,
    name: 'TypeScript Pro Course',
    description: 'Advanced TypeScript patterns and best practices',
    category: 'Education',
    price: 79.99,
    inStock: true,
    createdAt: '2026-08-06T10:00:00.000Z'
  }
];

# SpecX AI - TypeScript API

**Day 4 & 5 Project:** Building a typed REST API with unit tests

## 🎯 Project Overview

This is a TypeScript-based REST API built with Express.js, featuring:
- **Day 4:** Typed API endpoints with TypeScript interfaces
- **Day 5:** Comprehensive unit tests with Jest

## 📚 Learning Objectives

### Day 4 - Typed API
✅ Create a basic API with TypeScript  
✅ Build required endpoints: `/`, `/health`, `/items`  
✅ Return structured/typed responses  
✅ Understand request → processing → response flow  
✅ Use TypeScript types/interfaces for API data  

### Day 5 - Unit Tests
✅ Add unit tests for helper functions  
✅ Test API endpoints with supertest  
✅ Test expected/normal behavior  
✅ Test invalid or edge-case behavior  
✅ Use assertions to verify results  

## 🏗️ Project Structure

```
specx-api/
├── src/
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   ├── helpers/
│   │   └── validators.ts         # Helper functions
│   ├── routes/
│   │   └── items.ts              # Items endpoints
│   ├── data/
│   │   └── mockData.ts           # Sample data
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server entry point
├── tests/
│   ├── validators.test.ts        # Helper function tests
│   └── api.test.ts               # API endpoint tests
├── tsconfig.json                 # TypeScript configuration
├── jest.config.js                # Jest test configuration
└── package.json                  # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ installed
- npm installed

### Installation

```bash
# Navigate to project
cd c:\Users\sonu\IFI_Learning\specx-api

# Dependencies are already installed, but if needed:
npm install
```

### Running the API

```bash
# Start server (production mode)
npm start

# Start with auto-reload (development mode)
npm run dev
```

Server will start at: **http://localhost:3001**

## 📡 API Endpoints

### 1. GET /
**Root endpoint** - Welcome message

```bash
curl http://localhost:3001/
```

**Response:**
```json
{
  "success": true,
  "message": "Welcome to SpecX API",
  "data": {
    "welcome": "SpecX AI - TypeScript API for Day 4 & 5",
    "endpoints": [
      "GET / - This welcome message",
      "GET /health - API health status",
      "GET /items - Get all items",
      "GET /items/:id - Get specific item"
    ]
  }
}
```

### 2. GET /health
**Health check endpoint** - System status

```bash
curl http://localhost:3001/health
```

**Response:**
```json
{
  "success": true,
  "message": "API is running smoothly",
  "data": {
    "status": "healthy",
    "timestamp": "2026-08-10T12:00:00.000Z",
    "uptime": 150,
    "version": "1.0.0"
  }
}
```

### 3. GET /items
**Get all items** - Returns item list with optional filters

```bash
# Get all items
curl http://localhost:3001/items

# Filter by category
curl "http://localhost:3001/items?category=AI%20Services"

# Filter by stock status
curl "http://localhost:3001/items?inStock=true"

# Filter by price range
curl "http://localhost:3001/items?minPrice=100&maxPrice=300"

# Multiple filters
curl "http://localhost:3001/items?category=AI%20Services&inStock=true&maxPrice=300"
```

**Response:**
```json
{
  "success": true,
  "message": "Found 6 items",
  "data": {
    "total": 6,
    "items": [
      {
        "id": 1,
        "name": "Azure OpenAI API Access",
        "description": "Enterprise-grade AI language models",
        "category": "AI Services",
        "price": 299.99,
        "inStock": true,
        "createdAt": "2026-08-01T10:00:00.000Z"
      }
    ]
  }
}
```

### 4. GET /items/:id
**Get specific item** - Returns single item by ID

```bash
curl http://localhost:3001/items/1
```

**Response:**
```json
{
  "success": true,
  "message": "Item found",
  "data": {
    "id": 1,
    "name": "Azure OpenAI API Access",
    "description": "Enterprise-grade AI language models",
    "category": "AI Services",
    "price": 299.99,
    "inStock": true,
    "createdAt": "2026-08-01T10:00:00.000Z"
  }
}
```

## 🧪 Running Tests (Day 5)

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Test Output Example
```
PASS  tests/validators.test.ts
  Validator Helper Functions
    isValidString
      ✓ should return true for valid non-empty strings (2 ms)
      ✓ should return false for empty strings (1 ms)
      ✓ should return false for non-string types
    ...

PASS  tests/api.test.ts
  API Endpoints
    GET /
      ✓ should return welcome message (25 ms)
      ✓ should return structured response with endpoints list (8 ms)
    GET /health
      ✓ should return healthy status (10 ms)
      ✓ should return health data with required fields (7 ms)
    ...

Test Suites: 2 passed, 2 total
Tests:       30 passed, 30 total
Snapshots:   0 total
Time:        2.5 s
```

## 🎓 What You Learn

### TypeScript Concepts
- **Interfaces** - Defining type structures
- **Type Guards** - Runtime type checking
- **Generic Types** - Reusable type patterns
- **Type Inference** - Let TypeScript deduce types

### API Development
- **Express.js** - Web framework setup
- **Routing** - Endpoint organization
- **Middleware** - Request processing
- **Error Handling** - Proper error responses
- **Query Parameters** - URL parameter parsing

### Testing
- **Unit Tests** - Testing individual functions
- **Integration Tests** - Testing API endpoints
- **Test Organization** - Describe/it blocks
- **Assertions** - Verifying expected results
- **Edge Cases** - Testing error conditions
- **Test Coverage** - Measuring test completeness

## 📝 Key Files Explained

### `src/types/index.ts`
TypeScript interfaces defining data structures:
- `Item` - Product/service item
- `ApiResponse<T>` - Generic API response wrapper
- `HealthResponse` - Health check data
- `ItemsResponse` - Items list response
- `ItemQuery` - Filter parameters

### `src/helpers/validators.ts`
Utility functions with type guards:
- `isValidString()` - String validation
- `isPositiveNumber()` - Number validation
- `validateItem()` - Item object validation
- `filterItems()` - Array filtering logic
- `calculateUptime()` - Uptime calculation

### `src/routes/items.ts`
Items API endpoints:
- GET `/items` - List with filters
- GET `/items/:id` - Single item

### `tests/validators.test.ts`
Tests for helper functions (20+ test cases)

### `tests/api.test.ts`
Tests for API endpoints (15+ test cases)

## 🎯 Evidence for Submission

### Day 4 Evidence
1. **API Running Screenshot:**
   - Open browser/Postman to `http://localhost:3001/health`
   - Capture response showing typed data

2. **Endpoints Working:**
   - Screenshot of `/` endpoint
   - Screenshot of `/health` endpoint  
   - Screenshot of `/items` endpoint with filters

### Day 5 Evidence
1. **Test Results Screenshot:**
   - Run `npm test`
   - Capture terminal showing all tests passing

2. **Test Coverage Screenshot:**
   - Run `npm run test:coverage`
   - Capture coverage report

## 📊 Test Statistics

- **Total Tests:** 30+
- **Test Suites:** 2
- **Functions Tested:** 10+
- **API Endpoints Tested:** 4
- **Coverage:** High (>80%)

## 🔄 Next Steps

This project provides a foundation for:
- Day 6: Database Integration
- Day 7: Authentication & Authorization
- Day 8: Azure Deployment
- Day 9: Advanced features (caching, rate limiting)

## 📖 Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Jest Documentation](https://jestjs.io/)
- [Supertest GitHub](https://github.com/visionmedia/supertest)

## ✅ Completion Checklist

- [x] Created TypeScript API project
- [x] Implemented 3 required endpoints
- [x] Added TypeScript interfaces
- [x] Created helper functions with type guards
- [x] Added comprehensive unit tests
- [x] Tested API endpoints with supertest
- [x] All tests passing
- [x] Documentation complete

---

**Day 4 & 5 Complete!** 🎉

Repository: https://github.com/s5021/SpecX-AI-Landing  
Created: August 10, 2026

# Day 7: Application-to-Template Mapping

**Purpose:** Map existing application capabilities to relevant template patterns and IFI-style practices, demonstrating SDK-first thinking and safe integration patterns.

---

## Application Capabilities → Template Mapping

| Application Capability | Existing Implementation | IFI-Style Pattern | How It Is Consumed |
|---|---|---|---|
| **User Interface (React)** | `day3-react-dashboard/` with Header, Card, List, Form components | Presentation Layer / View Components | Components receive data via props; state lifted to container; no direct API calls in child components |
| **Data Fetching** | `useEffect` hook in Dashboard container; native `fetch()` API | API Consumption Layer | Container component handles data lifecycle; error/loading states managed at fetcher level |
| **Type Safety** | TypeScript interfaces (`Item`, `ApiResponse<T>`, `ItemsResponse`) | Typed Contracts / Schemas | Types defined in central `src/types/` directory; shared between frontend (via fetch) and backend (via Express) |
| **HTTP API** | TypeScript + Express server; REST endpoints (`GET /items`, `GET /health`, `GET /`) | REST API Service / Backend | Public endpoints follow RESTful conventions; CORS configured for safe cross-origin requests |
| **Response Structure** | `{ success, message, data, error }` wrapper | Standard API Response Envelope | Consistent structure enables predictable client-side handling; error messages travel with response |
| **Data Validation** | Helper functions (`validators.ts`): `isValidString()`, `validateItem()`, `filterItems()` | Validation Layer / Guards | Reusable validators enforce data integrity both at API layer and in tests; composable and testable |
| **Testing** | Jest with `supertest` for API integration tests; 40 passing tests | Automated Test Suite / CI Pipeline | Tests verify request/response contracts; each endpoint tested for success/failure/edge cases |
| **Error Handling** | Try-catch blocks; error state in React; 404/400/500 responses in API | Centralized Error Handling | Errors propagate through typed response; React displays to user; tests validate error paths |
| **State Management** | React `useState` for local component state; API call results | Reactive Data Binding | Single source of truth; state updates trigger re-renders; derived state computed from API response |
| **Logging / Observability** | `console.error()` in catch blocks; API returns error messages | Structured Logging | Error messages include context; frontend logs fetch failures; API logs on error paths |
| **Version Control / CI** | Git commits, branches, pull requests (implied) | Collaborative Development / Code Review | Work organized by feature/day; changes reviewed before merge; history preserved |

---

## Public Facade / SDK-First Thinking

### Core Principles

**1. Application Should Consume Approved/Public Interfaces**
- React Dashboard consumes the public `GET /items` endpoint
- No React component bypasses the API or directly accesses backend mock data
- API contracts are the boundary between frontend and backend

**Example (✅ Correct):**
```javascript
// Dashboard.js
const response = await fetch('http://localhost:3001/items'); // Public endpoint
const data = await response.json(); // Typed response
```

**Example (❌ Incorrect - Do Not Do This):**
```javascript
// Dashboard.js
import { mockItems } from '../../../specx-api/src/data/mockData'; // Direct import!
// This bypasses the API and violates encapsulation
```

**2. Application Code Should Not Bypass or Modify Internal Template Implementation**
- React app does NOT modify `src/helpers/validators.ts` or mock data
- React app does NOT call internal routes or private functions
- React app calls only published endpoints (`GET /`, `/health`, `/items`)

**Example (✅ Correct):**
```typescript
// specx-api/src/app.ts (PUBLIC)
app.get('/', (req, res) => { /* ... */ }); // Published endpoint
```

**Example (❌ Incorrect - Do Not Do This):**
```typescript
// React tries to import and use internal helper
import { filterItems } from '../specx-api/src/helpers/validators'; // Private!
```

**3. Shared/Template Changes Require Appropriate Review/Governance**
- Changes to `src/types/index.ts` affect the frontend-backend contract
- Changes to API endpoints require updating tests
- Changes to TypeScript types propagate to React

**Governance Pattern:**
```
Developer modifies GET /items endpoint
   ↓
Updates jest tests (api.test.ts)
   ↓
Commits changes with PR
   ↓
Tests must pass before merge
   ↓
React developer pulls latest code
   ↓
React app automatically uses new contract (TypeScript catches breaking changes)
```

### Why This Matters

**Problem:** If React directly imported mock data or internal helpers:
- ❌ Changing the backend breaks React without API-level change notification
- ❌ Mock data and API drift out of sync
- ❌ Multiple sources of truth
- ❌ No contract to validate

**Solution (SDK-First):** React consumes public API only:
- ✅ API is the single source of truth
- ✅ Changes to backend require API version bump or migration
- ✅ Jest tests catch breaking changes
- ✅ Typed response ensures contract compliance
- ✅ Frontend and backend can evolve independently

---

## Safe Starter Tasks

Small, low-risk examples that follow the same patterns used in Day 7:

### Task 1: Consume an Approved API Endpoint

**Objective:** Display data from an existing API in a React component

**Pattern:** (Exactly what we did in Day 7)

```javascript
// 1. Identify the public endpoint
GET http://localhost:3001/items

// 2. Check the response structure via Jest test
// See: tests/api.test.ts, line 63+

// 3. Create a container component with useEffect
useEffect(() => {
  fetch('http://localhost:3001/items')
    .then(res => res.json())
    .then(data => setItems(data.data.items));
}, []);

// 4. Add loading/error states
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
return <List items={items} />;
```

**Files to Reference:**
- `specx-api/tests/api.test.ts` - See endpoint contract
- `day3-react-dashboard/src/Dashboard.js` - See implementation (lines 45-91)

---

### Task 2: Display API Data in a Component

**Objective:** Map API response to component props

**Pattern:**

```javascript
// Step 1: Fetch data (done above)
const response = await fetch('http://localhost:3001/items');
const apiData = await response.json();

// Step 2: Transform if needed (convert types/dates)
const transformedItems = apiData.data.items.map(item => ({
  id: item.id,
  name: item.name,
  description: item.description,
  date: new Date(item.createdAt).toISOString().split('T')[0]
}));

// Step 3: Pass to component via props
<List items={transformedItems} />

// Step 4: Component renders
// See: day3-react-dashboard/src/components/List.js
```

**Why This Pattern?**
- Data fetching separated from rendering (single responsibility)
- Component accepts props (reusable, testable)
- Transformation logic centralized
- Easy to mock for testing

---

### Task 3: Add Typed Contracts

**Objective:** Create TypeScript types to match API response

**Pattern:**

```typescript
// 1. Check existing types (already defined)
// File: specx-api/src/types/index.ts
export interface Item { id, name, description, category, price, inStock, createdAt }
export interface ApiResponse<T> { success, message, data?, error? }
export interface ItemsResponse { total, items: Item[] }

// 2. Use types in React (with fetch)
interface ApiItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  inStock: boolean;
  createdAt: string;
}

// 3. Type the API call
const response = await fetch('http://localhost:3001/items');
const data: { success: boolean; data: { items: ApiItem[] } } = await response.json();

// 4. TypeScript catches mismatches at compile time
```

**Why This Pattern?**
- Catch errors early (before runtime)
- Self-document code (types are documentation)
- IDE autocomplete works
- Refactoring is safer

---

### Task 4: Add Unit Tests for API

**Objective:** Verify API behavior with Jest

**Pattern:** (Already done in Day 5, but here's the pattern)

```javascript
describe('GET /items', () => {
  
  // Test 1: Happy path
  it('should return all items', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.items).toBeInstanceOf(Array);
  });
  
  // Test 2: Error path
  it('should handle API errors gracefully', async () => {
    // Simulate error condition
    // Expect error response
  });
  
  // Test 3: Filtering
  it('should filter by category', async () => {
    const response = await request(app)
      .get('/items')
      .query({ category: 'AI Services' });
    expect(response.body.data.items.every(
      item => item.category === 'AI Services'
    )).toBe(true);
  });
});
```

**Run Command:**
```bash
cd specx-api
npm test
```

**Why This Pattern?**
- Automates verification
- Catches regressions
- Documents endpoint behavior
- Enables confident refactoring

---

### Task 5: Raise a Pull Request with API Changes

**Objective:** Propose changes to the API following governance

**Pattern:**

```bash
# 1. Create a feature branch
git checkout -b feature/add-new-endpoint

# 2. Make changes to API
# - Modify: src/routes/items.ts
# - Add: new endpoint or change existing one
# - Create: tests/new-endpoint.test.ts

# 3. Update tests
npm test  # Ensure all tests pass

# 4. Commit changes
git add .
git commit -m "Add new endpoint: GET /items/advanced-search

- Added filtering by multiple fields
- Updated ItemsResponse type
- Added 8 new integration tests
- All 48 tests passing"

# 5. Push to origin
git push origin feature/add-new-endpoint

# 6. Create Pull Request
# Title: "Add advanced search endpoint"
# Description:
# - What changed: Added GET /items/advanced-search
# - Why: Support complex filtering in UI
# - Tests: 8 new tests, all passing
# - Breaking changes: None

# 7. Request review
# Reviewer checks:
# - Are tests comprehensive?
# - Does response structure match existing pattern?
# - Are types updated?
# - Does it follow existing conventions?

# 8. Merge after approval
git merge feature/add-new-endpoint
```

**Why This Pattern?**
- Changes are reviewed before merge
- Tests verify quality
- History is preserved
- Collaboration is transparent

---

## Extending This Pattern

### To Add a New Feature

1. **Define the data structure** → Update `src/types/index.ts`
2. **Implement the endpoint** → Add to `src/routes/items.ts`
3. **Write tests** → Add to `tests/api.test.ts`
4. **Update React component** → Modify `day3-react-dashboard/src/Dashboard.js` (or relevant component)
5. **Test the flow** → Start both servers, verify data displays
6. **Commit & PR** → Follow PR pattern above

### Example: Add Price Filter

```
types/index.ts:  Update ItemQuery interface
routes/items.ts: Add price filtering logic
validators.ts:   (already has validatePrice)
api.test.ts:     Add test: "should filter by price range"
Dashboard.js:    (no change needed, API handles it)
```

---

## Summary

**Day 7 demonstrates SDK-first thinking:**
- ✅ Public APIs are the integration point
- ✅ Typed contracts prevent drift
- ✅ Tests validate contracts
- ✅ Changes require governance (PR/review)
- ✅ Components consume, don't modify internals
- ✅ Collaborative development with clear boundaries

**This approach scales:** As the application grows, the API becomes a stable interface that multiple clients (React, mobile, CLI, etc.) can consume safely.

# CLAUDE.md — naps-web

This file guides AI agents working on this codebase. Read it before writing any tests or making infrastructure changes.

---

## Project Overview

React 18 + Vite SPA. Source files are `.jsx` / `.tsx` / `.ts`. The path alias `@` maps to `./src`. The dev server proxies `/api` → `https://naps.odamarketplace.com`.

---

## Commands

```bash
npm run dev           # Start dev server (Vite)
npm run build         # Production build
npm run lint          # ESLint (flat config, ESLint 9)
npm test              # Vitest in watch mode
npm run test:coverage # Single run with v8 coverage report (text + lcov)
```

---

## Test Stack

| Tool | Version | Role |
|------|---------|------|
| Vitest | 4 | Test runner. `globals: true` — `describe`/`it`/`expect` are available globally, but existing tests import them explicitly for clarity. |
| jsdom | 29 | Browser-like DOM environment |
| @testing-library/react | 16 | Component render + `screen` queries |
| @testing-library/user-event | 14 | Realistic user interaction simulation |
| @testing-library/jest-dom | 6 | Extra DOM matchers (`toBeInTheDocument`, `toHaveValue`, etc.) |
| MSW | 2 (Node mode) | Network interception for integration-style tests |

---

## Test Infrastructure Files

| File | Purpose |
|------|---------|
| `src/test/setup.ts` | Imports jest-dom matchers; starts, resets, and stops the MSW server around every test |
| `src/test/mocks/server.ts` | MSW Node server instance |
| `src/test/mocks/handlers.ts` | Default API mock handlers — base URL is `http://localhost/api` |

The setup file (`src/test/setup.ts`) runs these lifecycle hooks globally so you do **not** need to repeat them in individual test files:

```ts
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## File Naming & Placement

Test files live **next to the source file** they test:

```
src/context/AuthContext.jsx          → src/context/AuthContext.test.jsx
src/apiCalls/user.jsx                → src/apiCalls/user.test.jsx
src/services/socketService.js        → src/services/socketService.test.js
src/lib/utils.ts                     → src/lib/utils.test.ts
```

Use `.test.jsx` for React component tests, `.test.ts` for pure TypeScript, `.test.js` for plain JS.

---

## Mocking Patterns

### a) Module mock (`vi.mock`)

Used to replace whole modules with controlled stubs. Declare `vi.mock(...)` before the import that uses it — Vitest hoists `vi.mock` calls automatically:

```js
vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from '../../context/AuthContext';

// Inside each test:
useAuth.mockReturnValue({ accessToken: 'tok', user: { id: 1 }, loading: false });
```

### b) Axios mock (for API unit tests in `src/apiCalls/`)

API call files are tested by mocking `axios` directly. **Both `sweetalert2` and `sweetalert2-react-content` must also be mocked** — the source files call `Swal.fire()` which fails in jsdom:

```js
vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));
vi.mock('sweetalert2-react-content', () => ({
  default: () => ({ fire: vi.fn().mockResolvedValue({ isConfirmed: true }) }),
}));
vi.mock('axios');

// In tests:
axios.post.mockResolvedValueOnce({ data: { access_token: 'tok' }, status: 200 });
axios.get.mockRejectedValueOnce({ response: { status: 401 } });
```

### c) Socket.io mock

Create a fresh mock socket object per test via a factory function:

```js
const createMockSocket = () => ({
  connected: true,
  on: vi.fn(), off: vi.fn(), emit: vi.fn(),
  disconnect: vi.fn(), removeAllListeners: vi.fn(),
});

let mockSocket = createMockSocket();

vi.mock('socket.io-client', () => ({ io: vi.fn(() => mockSocket) }));
import { io } from 'socket.io-client';

beforeEach(() => {
  mockSocket = createMockSocket();
  io.mockReturnValue(mockSocket);
});
```

### d) Router + navigate mock

```js
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

// Wrap render in <MemoryRouter> for any route-aware component:
render(<MemoryRouter><MyComponent /></MemoryRouter>);
```

### e) Simple component stub

```js
vi.mock('../../components/Navbar', () => ({
  default: () => <nav data-testid="navbar" />,
}));
```

---

## MSW Handler Pattern

Add or override handlers in `src/test/mocks/handlers.ts`. Use `http://localhost/api` as the base URL (jsdom resolves relative API paths against `http://localhost`):

```ts
import { http, HttpResponse } from 'msw';

http.get('http://localhost/api/some-endpoint', () =>
  HttpResponse.json({ key: 'value' })
)
```

To override a handler for a single test, call `server.use(...)` inside the test body. It is automatically reset to the defaults by `afterEach(() => server.resetHandlers())`:

```ts
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';

it('handles server error', async () => {
  server.use(
    http.get('http://localhost/api/forums', () =>
      HttpResponse.json({ message: 'Internal error' }, { status: 500 })
    )
  );
  // ... render and assert error state
});
```

---

## Rendering Helpers

Prefer local helper functions scoped to the test file rather than global wrappers:

```js
const renderWithRouter = (initialEntry = '/path') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/path" element={<MyComponent />} />
      </Routes>
    </MemoryRouter>
  );
```

For auth-dependent components, mock `useAuth` via `vi.mock` rather than rendering a full `<AuthProvider>`.

---

## Coverage

`npm run test:coverage` generates a text summary and an `lcov` report. These paths are excluded from coverage (configured in `vite.config.js`):

- `src/test/**`
- `src/assets/**`
- `src/main.jsx`

The `src/components/ui/*.tsx` shadcn/ui components are not expected to be covered unless custom logic is added to them.

---

## Existing Tests

| File | What it covers |
|------|---------------|
| `src/context/AuthContext.test.jsx` | Auth context — login, logout, persistence, loading state |
| `src/components/ProtectedRoute.test.jsx` | Route guard — redirects when unauthenticated |
| `src/pages/authentication/Login.test.jsx` | Login page — form, validation, success/error flows |
| `src/apiCalls/user.test.jsx` | User API functions — all endpoints |
| `src/apiCalls/forums.test.jsx` | Forums API functions — all endpoints |
| `src/services/socketService.test.js` | Socket service — connect, events, disconnect |
| `src/lib/utils.test.ts` | `cn()` class merge utility |

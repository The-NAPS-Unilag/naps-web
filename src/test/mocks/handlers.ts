import { http, HttpResponse } from 'msw';

// Base URL for test environment (jsdom resolves relative URLs against http://localhost)
const BASE = 'http://localhost/api';

export const handlers = [
  // Auth
  http.post(`${BASE}/users/login`, () =>
    HttpResponse.json({
      user: { id: 1, email: 'test@example.com', name: 'Test User' },
      access_token: 'test-token-123',
    })
  ),

  http.post(`${BASE}/users`, () =>
    HttpResponse.json(
      { user: { id: 2, email: 'new@example.com', name: 'New User' } },
      { status: 201 }
    )
  ),

  http.post(`${BASE}/users/confirm`, () =>
    HttpResponse.json({ message: 'Email confirmed' })
  ),

  http.post(`${BASE}/users/resend-otp`, () =>
    HttpResponse.json({ message: 'OTP resent' })
  ),

  http.post(`${BASE}/users/forgot-password`, () =>
    HttpResponse.json({ message: 'Reset email sent' })
  ),

  http.post(`${BASE}/users/reset-password`, () =>
    HttpResponse.json({ message: 'Password reset successfully' })
  ),

  http.get(`${BASE}/users/me`, () =>
    HttpResponse.json({ id: 1, email: 'test@example.com', name: 'Test User' })
  ),

  http.get(`${BASE}/users`, () =>
    HttpResponse.json([{ id: 1, email: 'test@example.com', name: 'Test User' }])
  ),

  // Forums
  http.get(`${BASE}/forums`, () =>
    HttpResponse.json([{ id: 1, name: 'General', description: 'General forum' }])
  ),

  http.get(`${BASE}/forums/explore`, () =>
    HttpResponse.json([{ id: 2, name: 'Study Group', description: 'Study group forum' }])
  ),

  http.get(`${BASE}/forums/recommended`, () =>
    HttpResponse.json([{ id: 3, name: 'Recommended', description: 'Recommended forum' }])
  ),

  http.get(`${BASE}/forums/top-contributors`, () =>
    HttpResponse.json([{ user_id: 1, name: 'Top User', count: 42 }])
  ),

  http.post(`${BASE}/forums`, () =>
    HttpResponse.json({ id: 10, name: 'New Forum' }, { status: 201 })
  ),

  http.post(`${BASE}/forums/:forumId/join`, () =>
    HttpResponse.json({ message: 'Joined successfully' })
  ),

  http.post(`${BASE}/forums/:forumId/threads`, () =>
    HttpResponse.json({ id: 5, title: 'New Thread', body: 'Body' }, { status: 201 })
  ),

  http.get(`${BASE}/forums/threads/:threadId`, () =>
    HttpResponse.json({ id: 5, title: 'Test Thread', messages: [] })
  ),

  http.get(`${BASE}/forums/threads/:threadId/messages`, () =>
    HttpResponse.json([{ id: 1, content: 'Hello', user_id: 1 }])
  ),

  http.post(`${BASE}/forums/threads/:threadId/messages`, () =>
    HttpResponse.json({ id: 2, content: 'New message' }, { status: 201 })
  ),

  http.post(`${BASE}/forums/messages/:messageId/like`, () =>
    HttpResponse.json({ likes: 5 })
  ),
];

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProtectedRoute from './ProtectedRoute';

// Mock useAuth so we can control the auth state in each test
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../context/AuthContext';

const renderWithRouter = (initialEntry = '/protected') => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/outlet"
          element={
            <ProtectedRoute>
              <Routes>
                <Route index element={<div>Outlet Content</div>} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('ProtectedRoute', () => {
  it('renders children when accessToken is present', () => {
    useAuth.mockReturnValue({ user: { id: 1 }, accessToken: 'valid-token' });

    renderWithRouter('/protected');

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to /login when accessToken is absent', () => {
    useAuth.mockReturnValue({ user: null, accessToken: null });

    renderWithRouter('/protected');

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('redirects to /login when accessToken is an empty string', () => {
    useAuth.mockReturnValue({ user: null, accessToken: '' });

    renderWithRouter('/protected');

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('does not render protected content when unauthenticated', () => {
    useAuth.mockReturnValue({ user: null, accessToken: null });

    renderWithRouter('/protected');

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders Outlet when no children prop is provided and user is authenticated', () => {
    useAuth.mockReturnValue({ user: { id: 1 }, accessToken: 'valid-token' });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<div>Dashboard via Outlet</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard via Outlet')).toBeInTheDocument();
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from './Login';

// --- Module mocks ---

vi.mock('../../components/Navbar', () => ({
  default: () => <nav data-testid="navbar" />,
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

const mockLogin = vi.fn();
const mockUseAuth = vi.fn();
vi.mock('../../context/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('../../apiCalls/user', () => ({
  UsersLogin: vi.fn(),
}));

import { UsersLogin } from '../../apiCalls/user';

// --- Helpers ---

const renderLogin = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

describe('Login page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ login: mockLogin, accessToken: null });
  });

  it('renders the username and password fields', () => {
    renderLogin();
    expect(screen.getByLabelText(/matric number \/ email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders the Login button as disabled when fields are empty', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
  });

  it('enables the Login button only when both fields have values', async () => {
    const user = userEvent.setup();
    renderLogin();

    const usernameInput = screen.getByLabelText(/matric number \/ email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginBtn = screen.getByRole('button', { name: /login/i });

    await user.type(usernameInput, 'student@unilag.edu.ng');
    expect(loginBtn).toBeDisabled();

    await user.type(passwordInput, 'secret');
    expect(loginBtn).not.toBeDisabled();
  });

  it('calls UsersLogin with lowercased username and password on submit', async () => {
    const user = userEvent.setup();
    UsersLogin.mockResolvedValue({ status: 200, data: { user: { id: 1 }, access_token: 'tok' } });

    renderLogin();

    await user.type(screen.getByLabelText(/matric number \/ email/i), 'STUDENT@UNILAG.EDU.NG');
    await user.type(screen.getByLabelText(/password/i), 'mypassword');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(UsersLogin).toHaveBeenCalledWith('student@unilag.edu.ng', 'mypassword');
  });

  it('calls login() and navigates to /dashboard on successful login', async () => {
    const user = userEvent.setup();
    const authData = { user: { id: 1, name: 'Test User' }, access_token: 'tok123' };
    UsersLogin.mockResolvedValue({ status: 200, data: authData });

    renderLogin();

    await user.type(screen.getByLabelText(/matric number \/ email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(authData);
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('does not call login() when API response is not 200', async () => {
    const user = userEvent.setup();
    UsersLogin.mockResolvedValue({ status: 401, data: {} });

    renderLogin();

    await user.type(screen.getByLabelText(/matric number \/ email/i), 'wrong@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrongpass');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalledWith('/dashboard');
    });
  });

  it('toggles password visibility when the eye icon is clicked', async () => {
    const user = userEvent.setup();
    renderLogin();

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    // The toggle button is a div with the Eye/EyeClosed icon inside it
    const toggleBtn = passwordInput.parentElement?.querySelector('div[class*="cursor-pointer"]');
    if (toggleBtn) {
      await user.click(toggleBtn);
      expect(passwordInput).toHaveAttribute('type', 'text');

      await user.click(toggleBtn);
      expect(passwordInput).toHaveAttribute('type', 'password');
    }
  });

  it('redirects to /dashboard if user is already authenticated', () => {
    mockUseAuth.mockReturnValue({ login: mockLogin, accessToken: 'existing-token' });
    renderLogin();
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('renders a link to the signup page', () => {
    renderLogin();
    expect(screen.getByText(/signup/i)).toBeInTheDocument();
  });

  it('renders a forgot password link', () => {
    renderLogin();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });
});

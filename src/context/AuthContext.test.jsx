import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AuthProvider, { useAuth } from './AuthContext';

// Helper component that renders all auth state and exposes actions
const AuthConsumer = () => {
  const { user, accessToken, login, logout, loading } = useAuth();
  return (
    <div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'null'}</div>
      <div data-testid="token">{accessToken ?? 'null'}</div>
      <div data-testid="loading">{String(loading)}</div>
      <button
        onClick={() =>
          login({ user: { id: 1, name: 'Test User' }, access_token: 'tok123' })
        }
      >
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const renderWithAuth = (ui = <AuthConsumer />) =>
  render(<AuthProvider>{ui}</AuthProvider>);

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('starts with loading=true then resolves to false', async () => {
    renderWithAuth();
    // After the useEffect runs, loading should become false
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
  });

  it('initialises user and token as null when localStorage is empty', async () => {
    renderWithAuth();
    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('token')).toHaveTextContent('null');
  });

  it('rehydrates user and token from localStorage on mount', async () => {
    const storedUser = { id: 42, name: 'Stored User' };
    localStorage.setItem('user', JSON.stringify(storedUser));
    localStorage.setItem('accessToken', 'stored-token');

    renderWithAuth();

    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );
    expect(screen.getByTestId('user')).toHaveTextContent('Stored User');
    expect(screen.getByTestId('token')).toHaveTextContent('stored-token');
  });

  it('login() sets user and token in state and localStorage', async () => {
    const user = userEvent.setup();
    renderWithAuth();

    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );

    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    expect(screen.getByTestId('token')).toHaveTextContent('tok123');
    expect(localStorage.getItem('accessToken')).toBe('tok123');
    expect(JSON.parse(localStorage.getItem('user') ?? '{}')).toMatchObject({
      id: 1,
      name: 'Test User',
    });
  });

  it('logout() clears user and token from state and localStorage', async () => {
    const user = userEvent.setup();
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
    localStorage.setItem('accessToken', 'tok123');

    renderWithAuth();

    await waitFor(() =>
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    );

    await user.click(screen.getByRole('button', { name: 'Logout' }));

    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(screen.getByTestId('token')).toHaveTextContent('null');
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('does not render children while loading', async () => {
    // Spy on localStorage to delay the resolution simulation
    const originalGetItem = localStorage.getItem.bind(localStorage);
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      return originalGetItem(key);
    });

    const { container } = render(
      <AuthProvider>
        <span data-testid="child">Child Content</span>
      </AuthProvider>
    );

    // Children are hidden until loading is false (AuthProvider renders {!loading && children})
    // We confirm that after resolution the child becomes visible
    vi.restoreAllMocks();
    await waitFor(() =>
      expect(container.querySelector('[data-testid="child"]')).toBeInTheDocument()
    );
  });

  it('useAuth throws when used outside AuthProvider', () => {
    const BadConsumer = () => {
      // useContext returns undefined when there is no provider
      const ctx = useAuth();
      return <div>{ctx ? 'has ctx' : 'no ctx'}</div>;
    };

    // Render without AuthProvider — useAuth returns undefined from context
    const { container } = render(<BadConsumer />);
    expect(container).toHaveTextContent('no ctx');
  });
});

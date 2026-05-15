import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';

// Mock sweetalert2 and its React wrapper so dialog rendering is a no-op
vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));
vi.mock('sweetalert2-react-content', () => ({
  default: () => ({ fire: vi.fn().mockResolvedValue({ isConfirmed: true }) }),
}));

// Mock axios so no real HTTP requests are made
vi.mock('axios');

import {
  UsersLogin,
  UsersCreate,
  UsersConfirmEmail,
  UsersResendOTP,
  UsersForgotPassword,
  UsersResetPassword,
  UsersGetMe,
  UsersGetActivity,
  UsersGets,
} from './user';

const mockResponse = (data, status = 200) => ({
  data,
  status,
});

describe('User API calls', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // ---- UsersLogin ----
  describe('UsersLogin', () => {
    it('POSTs to /api/users/login with email and password', async () => {
      axios.post.mockResolvedValueOnce(
        mockResponse({ user: { id: 1 }, access_token: 'tok' })
      );

      await UsersLogin('test@example.com', 'pass123');

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/users/login'),
        { email: 'test@example.com', password: 'pass123' },
        expect.objectContaining({ headers: expect.objectContaining({ Accept: 'application/json' }) })
      );
    });

    it('returns the axios response on success', async () => {
      const responseData = { user: { id: 1 }, access_token: 'tok' };
      axios.post.mockResolvedValueOnce(mockResponse(responseData));

      const result = await UsersLogin('test@example.com', 'pass123');

      expect(result.status).toBe(200);
      expect(result.data).toEqual(responseData);
    });

    it('returns the error response on failure so callers can read status/data', async () => {
      const error = new Error('Request failed with status code 401');
      error.response = { status: 401, data: { status: 'Unauthorized', message: 'Invalid credentials' } };
      axios.post.mockRejectedValueOnce(error);

      const result = await UsersLogin('bad@example.com', 'wrong');

      expect(result).toEqual(error.response);
    });

    it('returns null on a true network error with no response', async () => {
      const error = new Error('Network Error');
      axios.post.mockRejectedValueOnce(error);

      const result = await UsersLogin('bad@example.com', 'wrong');

      expect(result).toBeNull();
    });
  });

  // ---- UsersCreate ----
  describe('UsersCreate', () => {
    it('POSTs to /api/users with FormData', async () => {
      axios.post.mockResolvedValueOnce(mockResponse({ user: { id: 2 } }, 201));

      const data = { email: 'new@example.com', name: 'New User' };
      await UsersCreate(data);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/users'),
        expect.any(FormData),
        expect.objectContaining({
          headers: expect.objectContaining({ 'Content-Type': 'multipart/form-data' }),
        })
      );
    });

    it('passes through a FormData object directly', async () => {
      axios.post.mockResolvedValueOnce(mockResponse({ user: { id: 2 } }, 201));

      const fd = new FormData();
      fd.append('email', 'new@example.com');
      await UsersCreate(fd);

      const [, calledBody] = axios.post.mock.calls[0];
      expect(calledBody).toBe(fd);
    });
  });

  // ---- UsersConfirmEmail ----
  describe('UsersConfirmEmail', () => {
    it('POSTs to /api/users/confirm with email and otp', async () => {
      axios.post.mockResolvedValueOnce(mockResponse({ message: 'Confirmed' }));

      await UsersConfirmEmail('test@example.com', '123456');

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/users/confirm'),
        { email: 'test@example.com', otp: '123456' },
        expect.any(Object)
      );
    });
  });

  // ---- UsersResendOTP ----
  describe('UsersResendOTP', () => {
    it('POSTs to /api/users/resend-otp with email', async () => {
      axios.post.mockResolvedValueOnce(mockResponse({ message: 'Sent' }));

      await UsersResendOTP('test@example.com');

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/users/resend-otp'),
        { email: 'test@example.com' },
        expect.any(Object)
      );
    });
  });

  // ---- UsersForgotPassword ----
  describe('UsersForgotPassword', () => {
    it('POSTs to /api/users/forgot-password with email', async () => {
      axios.post.mockResolvedValueOnce(mockResponse({ message: 'Email sent' }));

      await UsersForgotPassword('test@example.com');

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/users/forgot-password'),
        { email: 'test@example.com' },
        expect.any(Object)
      );
    });
  });

  // ---- UsersResetPassword ----
  describe('UsersResetPassword', () => {
    it('POSTs to /api/users/reset-password with email, otp, and new_password', async () => {
      axios.post.mockResolvedValueOnce(mockResponse({ message: 'Reset' }));

      await UsersResetPassword('test@example.com', '123456', 'newpass');

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/users/reset-password'),
        { email: 'test@example.com', otp: '123456', new_password: 'newpass' },
        expect.any(Object)
      );
    });
  });

  // ---- UsersGetMe ----
  describe('UsersGetMe', () => {
    it('GETs /api/users/me and attaches Bearer token from localStorage', async () => {
      localStorage.setItem('accessToken', 'my-secret-token');
      axios.get.mockResolvedValueOnce(mockResponse({ id: 1, email: 'me@example.com' }));

      await UsersGetMe();

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/users/me'),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer my-secret-token',
          }),
        })
      );
    });

    it('sends no Authorization header when no token is stored', async () => {
      axios.get.mockResolvedValueOnce(mockResponse({ id: 1 }));

      await UsersGetMe();

      const [, config] = axios.get.mock.calls[0];
      expect(config.headers.Authorization).toBeUndefined();
    });

    it('returns null when the request fails', async () => {
      const error = new Error('Network Error');
      error.response = { data: { message: 'Unauthorized Access' } };
      axios.get.mockRejectedValueOnce(error);

      const result = await UsersGetMe();

      expect(result).toBeUndefined();
    });
  });

  // ---- UsersGetActivity ----
  describe('UsersGetActivity', () => {
    it('GETs /api/users/:id/activity', async () => {
      axios.get.mockResolvedValueOnce(mockResponse([{ action: 'login' }]));

      const result = await UsersGetActivity(5);

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/users/5/activity'),
        expect.any(Object)
      );
      expect(result.data).toEqual([{ action: 'login' }]);
    });

    it('returns null on failure', async () => {
      axios.get.mockRejectedValueOnce(new Error('Network Error'));

      const result = await UsersGetActivity(99);

      expect(result).toBeNull();
    });
  });

  // ---- UsersGets ----
  describe('UsersGets', () => {
    it('GETs /api/users and attaches auth header', async () => {
      localStorage.setItem('accessToken', 'admin-token');
      axios.get.mockResolvedValueOnce(mockResponse([{ id: 1 }]));

      await UsersGets();

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/users'),
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: 'Bearer admin-token' }),
        })
      );
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('sweetalert2', () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));
vi.mock('sweetalert2-react-content', () => ({
  default: () => ({ fire: vi.fn().mockResolvedValue({ isConfirmed: true }) }),
}));

vi.mock('axios');

import {
  GetForums,
  ExploreForums,
  GetRecommendedForums,
  GetTopContributors,
  CreateForum,
  JoinForum,
  CreateThread,
  GetThread,
  GetMessages,
  SendMessage,
  LikeMessage,
} from './forums';

const ok = (data, status = 200) => ({ data, status });

describe('Forums API calls', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  // ---- GetForums ----
  describe('GetForums', () => {
    it('GETs /api/forums and returns the response', async () => {
      const forums = [{ id: 1, name: 'General' }];
      axios.get.mockResolvedValueOnce(ok(forums));

      const result = await GetForums();

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/forums'),
        expect.any(Object)
      );
      expect(result.data).toEqual(forums);
    });

    it('returns null on error', async () => {
      axios.get.mockRejectedValueOnce(new Error('Network Error'));

      const result = await GetForums();

      expect(result).toBeNull();
    });

    it('attaches Bearer token when one is stored', async () => {
      localStorage.setItem('accessToken', 'forum-token');
      axios.get.mockResolvedValueOnce(ok([]));

      await GetForums();

      const [, config] = axios.get.mock.calls[0];
      expect(config.headers.Authorization).toBe('Bearer forum-token');
    });
  });

  // ---- ExploreForums ----
  describe('ExploreForums', () => {
    it('GETs /api/forums/explore', async () => {
      axios.get.mockResolvedValueOnce(ok([{ id: 2, name: 'Study Group' }]));

      await ExploreForums();

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/forums/explore'),
        expect.any(Object)
      );
    });

    it('returns null on error', async () => {
      axios.get.mockRejectedValueOnce(new Error('Fail'));
      const result = await ExploreForums();
      expect(result).toBeNull();
    });
  });

  // ---- GetRecommendedForums ----
  describe('GetRecommendedForums', () => {
    it('GETs /api/forums/recommended', async () => {
      axios.get.mockResolvedValueOnce(ok([]));

      await GetRecommendedForums();

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/forums/recommended'),
        expect.any(Object)
      );
    });
  });

  // ---- GetTopContributors ----
  describe('GetTopContributors', () => {
    it('GETs /api/forums/top-contributors', async () => {
      axios.get.mockResolvedValueOnce(ok([{ user_id: 1, count: 10 }]));

      await GetTopContributors();

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/forums/top-contributors'),
        expect.any(Object)
      );
    });
  });

  // ---- CreateForum ----
  describe('CreateForum', () => {
    it('POSTs to /api/forums with the forum data', async () => {
      const forumData = { name: 'New Forum', description: 'A forum', is_general: false };
      axios.post.mockResolvedValueOnce(ok({ id: 10, ...forumData }, 201));

      await CreateForum(forumData);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/forums'),
        forumData,
        expect.any(Object)
      );
    });

    it('throws on error', async () => {
      const err = new Error('Forbidden');
      err.response = { data: { message: 'Not allowed' } };
      axios.post.mockRejectedValueOnce(err);

      await expect(CreateForum({ name: 'x' })).rejects.toThrow('Forbidden');
    });
  });

  // ---- JoinForum ----
  describe('JoinForum', () => {
    it('POSTs to /api/forums/:id/join', async () => {
      axios.post.mockResolvedValueOnce(ok({ message: 'Joined' }));

      await JoinForum(3);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/forums/3/join'),
        {},
        expect.any(Object)
      );
    });

    it('throws on error', async () => {
      axios.post.mockRejectedValueOnce(new Error('Already joined'));

      await expect(JoinForum(3)).rejects.toThrow('Already joined');
    });
  });

  // ---- CreateThread ----
  describe('CreateThread', () => {
    it('POSTs to /api/forums/:id/threads with thread data', async () => {
      const threadData = { title: 'New Thread', body: 'Content' };
      axios.post.mockResolvedValueOnce(ok({ id: 5, ...threadData }, 201));

      await CreateThread(1, threadData);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/forums/1/threads'),
        threadData,
        expect.any(Object)
      );
    });

    it('throws on error', async () => {
      axios.post.mockRejectedValueOnce(new Error('Bad Request'));

      await expect(CreateThread(1, {})).rejects.toThrow('Bad Request');
    });
  });

  // ---- GetThread ----
  describe('GetThread', () => {
    it('GETs /api/forums/threads/:id', async () => {
      axios.get.mockResolvedValueOnce(ok({ id: 5, title: 'My Thread' }));

      const result = await GetThread(5);

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/forums/threads/5'),
        expect.any(Object)
      );
      expect(result.data.title).toBe('My Thread');
    });

    it('returns null on error', async () => {
      axios.get.mockRejectedValueOnce(new Error('Not found'));

      const result = await GetThread(999);

      expect(result).toBeNull();
    });
  });

  // ---- GetMessages ----
  describe('GetMessages', () => {
    it('GETs /api/forums/threads/:id/messages', async () => {
      const messages = [{ id: 1, content: 'Hello' }];
      axios.get.mockResolvedValueOnce(ok(messages));

      const result = await GetMessages(5);

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/forums/threads/5/messages'),
        expect.any(Object)
      );
      expect(result.data).toEqual(messages);
    });

    it('returns null on error', async () => {
      axios.get.mockRejectedValueOnce(new Error('Error'));
      const result = await GetMessages(5);
      expect(result).toBeNull();
    });
  });

  // ---- SendMessage ----
  describe('SendMessage', () => {
    it('POSTs FormData to /api/forums/threads/:id/messages with content', async () => {
      axios.post.mockResolvedValueOnce(ok({ id: 2, content: 'Hi' }));

      await SendMessage(5, { content: 'Hi' });

      const [url, body, config] = axios.post.mock.calls[0];
      expect(url).toContain('/forums/threads/5/messages');
      expect(body).toBeInstanceOf(FormData);
      expect(body.get('content')).toBe('Hi');
      expect(config.headers['Content-Type']).toBe('multipart/form-data');
    });

    it('appends parent_message_id and attachment when provided', async () => {
      axios.post.mockResolvedValueOnce(ok({ id: 3 }));

      const file = new File(['content'], 'test.txt', { type: 'text/plain' });
      await SendMessage(5, { content: 'Reply', parent_message_id: 1, attachment: file });

      const [, body] = axios.post.mock.calls[0];
      expect(body.get('parent_message_id')).toBe('1');
      expect(body.get('attachment')).toBe(file);
    });

    it('throws on error', async () => {
      axios.post.mockRejectedValueOnce(new Error('Send failed'));

      await expect(SendMessage(5, { content: 'x' })).rejects.toThrow('Send failed');
    });
  });

  // ---- LikeMessage ----
  describe('LikeMessage', () => {
    it('POSTs to /api/forums/messages/:id/like', async () => {
      axios.post.mockResolvedValueOnce(ok({ likes: 5 }));

      const result = await LikeMessage(7);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/forums/messages/7/like'),
        {},
        expect.any(Object)
      );
      expect(result.data.likes).toBe(5);
    });

    it('throws on error', async () => {
      axios.post.mockRejectedValueOnce(new Error('Like failed'));

      await expect(LikeMessage(7)).rejects.toThrow('Like failed');
    });
  });
});

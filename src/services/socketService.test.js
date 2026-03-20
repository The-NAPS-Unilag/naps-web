import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---- Mock socket.io-client ----
// We create a factory that returns a fresh mock socket each time `io()` is called.
const createMockSocket = () => ({
  connected: true,
  on: vi.fn(),
  off: vi.fn(),
  emit: vi.fn(),
  disconnect: vi.fn(),
  removeAllListeners: vi.fn(),
});

let mockSocket = createMockSocket();

vi.mock('socket.io-client', () => ({
  io: vi.fn(() => mockSocket),
}));

import { io } from 'socket.io-client';
import socketService from './socketService';

// Reset service and socket before every test so tests are isolated
beforeEach(() => {
  mockSocket = createMockSocket();
  io.mockReturnValue(mockSocket);
  // Reset internal service state
  socketService.socket = null;
  socketService.connected = false;
  vi.clearAllMocks();
});

describe('SocketService', () => {
  // ---- connect() ----
  describe('connect()', () => {
    it('calls io() and returns the socket', () => {
      const socket = socketService.connect();
      expect(io).toHaveBeenCalledOnce();
      expect(socket).toBe(mockSocket);
    });

    it('registers connect, disconnect, and connect_error event handlers', () => {
      socketService.connect();
      const events = mockSocket.on.mock.calls.map(([event]) => event);
      expect(events).toContain('connect');
      expect(events).toContain('disconnect');
      expect(events).toContain('connect_error');
    });

    it('sets connected=true when the connect event fires', () => {
      socketService.connect();
      // Find and invoke the connect handler
      const [, handler] = mockSocket.on.mock.calls.find(([e]) => e === 'connect');
      handler();
      expect(socketService.connected).toBe(true);
    });

    it('sets connected=false when the disconnect event fires', () => {
      socketService.connect();
      socketService.connected = true;
      const [, handler] = mockSocket.on.mock.calls.find(([e]) => e === 'disconnect');
      handler('transport close');
      expect(socketService.connected).toBe(false);
    });

    it('sets connected=false on connect_error', () => {
      socketService.connect();
      socketService.connected = true;
      const [, handler] = mockSocket.on.mock.calls.find(([e]) => e === 'connect_error');
      handler(new Error('Connection refused'));
      expect(socketService.connected).toBe(false);
    });

    it('does not call io() again if already connected', () => {
      socketService.socket = mockSocket; // already initialised
      socketService.connect();
      expect(io).not.toHaveBeenCalled();
    });
  });

  // ---- disconnect() ----
  describe('disconnect()', () => {
    it('calls socket.disconnect() and nulls out the socket', () => {
      socketService.connect();
      socketService.disconnect();
      expect(mockSocket.disconnect).toHaveBeenCalledOnce();
      expect(socketService.socket).toBeNull();
      expect(socketService.connected).toBe(false);
    });

    it('does nothing when socket is null', () => {
      socketService.disconnect(); // socket is already null from beforeEach
      expect(mockSocket.disconnect).not.toHaveBeenCalled();
    });
  });

  // ---- isConnected() ----
  describe('isConnected()', () => {
    it('returns true when connected flag and socket.connected are both true', () => {
      socketService.connect();
      socketService.connected = true;
      mockSocket.connected = true;
      expect(socketService.isConnected()).toBe(true);
    });

    it('returns false when the internal flag is false', () => {
      socketService.connect();
      socketService.connected = false;
      expect(socketService.isConnected()).toBe(false);
    });

    it('returns falsy when socket is null', () => {
      socketService.connected = true;
      // socket is null → this.socket?.connected is undefined → truthy && undefined = undefined
      expect(socketService.isConnected()).toBeFalsy();
    });
  });

  // ---- joinThread() ----
  describe('joinThread()', () => {
    it('emits join_thread with thread_id and user_id when connected', () => {
      socketService.connect();
      socketService.joinThread(42, 7);
      expect(mockSocket.emit).toHaveBeenCalledWith('join_thread', {
        thread_id: 42,
        user_id: 7,
      });
    });

    it('does not emit when socket is not connected', () => {
      mockSocket.connected = false;
      socketService.connect();
      socketService.joinThread(42, 7);
      expect(mockSocket.emit).not.toHaveBeenCalled();
    });

    it('does nothing when socket is null', () => {
      socketService.joinThread(42, 7);
      expect(mockSocket.emit).not.toHaveBeenCalled();
    });
  });

  // ---- leaveThread() ----
  describe('leaveThread()', () => {
    it('emits leave_thread with thread_id and user_id when connected', () => {
      socketService.connect();
      socketService.leaveThread(42, 7);
      expect(mockSocket.emit).toHaveBeenCalledWith('leave_thread', {
        thread_id: 42,
        user_id: 7,
      });
    });

    it('does not emit when socket is not connected', () => {
      mockSocket.connected = false;
      socketService.connect();
      socketService.leaveThread(42, 7);
      expect(mockSocket.emit).not.toHaveBeenCalled();
    });
  });

  // ---- onNewMessage() / offNewMessage() ----
  describe('onNewMessage() / offNewMessage()', () => {
    it('registers a listener for the new_message event', () => {
      const cb = vi.fn();
      socketService.connect();
      socketService.onNewMessage(cb);
      expect(mockSocket.on).toHaveBeenCalledWith('new_message', cb);
    });

    it('removes the listener with offNewMessage()', () => {
      const cb = vi.fn();
      socketService.connect();
      socketService.offNewMessage(cb);
      expect(mockSocket.off).toHaveBeenCalledWith('new_message', cb);
    });

    it('does nothing when socket is null', () => {
      const cb = vi.fn();
      socketService.onNewMessage(cb); // socket is null
      expect(mockSocket.on).not.toHaveBeenCalled();
    });
  });

  // ---- onUserJoined() / offUserJoined() ----
  describe('onUserJoined() / offUserJoined()', () => {
    it('registers a listener for user_joined', () => {
      const cb = vi.fn();
      socketService.connect();
      socketService.onUserJoined(cb);
      expect(mockSocket.on).toHaveBeenCalledWith('user_joined', cb);
    });

    it('removes the user_joined listener', () => {
      const cb = vi.fn();
      socketService.connect();
      socketService.offUserJoined(cb);
      expect(mockSocket.off).toHaveBeenCalledWith('user_joined', cb);
    });
  });

  // ---- onUserLeft() / offUserLeft() ----
  describe('onUserLeft() / offUserLeft()', () => {
    it('registers a listener for user_left', () => {
      const cb = vi.fn();
      socketService.connect();
      socketService.onUserLeft(cb);
      expect(mockSocket.on).toHaveBeenCalledWith('user_left', cb);
    });

    it('removes the user_left listener', () => {
      const cb = vi.fn();
      socketService.connect();
      socketService.offUserLeft(cb);
      expect(mockSocket.off).toHaveBeenCalledWith('user_left', cb);
    });
  });

  // ---- removeAllListeners() ----
  describe('removeAllListeners()', () => {
    it('removes all known event listeners from the socket', () => {
      socketService.connect();
      socketService.removeAllListeners();
      expect(mockSocket.removeAllListeners).toHaveBeenCalledWith('new_message');
      expect(mockSocket.removeAllListeners).toHaveBeenCalledWith('user_joined');
      expect(mockSocket.removeAllListeners).toHaveBeenCalledWith('user_left');
    });

    it('does nothing when socket is null', () => {
      socketService.removeAllListeners(); // socket is null from beforeEach
      expect(mockSocket.removeAllListeners).not.toHaveBeenCalled();
    });
  });
});

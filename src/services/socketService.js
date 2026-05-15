import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_APP_SOCKET_URL || 
  (import.meta.env.VITE_APP_NAPS_URL ? import.meta.env.VITE_APP_NAPS_URL.replace('/api', '') : "");

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.listeners = {};
  }

  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      this.socket.on("connect", () => {
        //console.log("Socket connected:", this.socket.id);
        this.connected = true;
      });

      this.socket.on("disconnect", (reason) => {
        //console.log("Socket disconnected:", reason);
        this.connected = false;
      });

      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
        this.connected = false;
      });

      return this.socket;
    } catch (error) {
      console.error("Failed to initialize socket:", error);
      return null;
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  isConnected() {
    return this.connected && this.socket?.connected;
  }

  /**
   * Join a thread room to receive real-time updates
   * @param {number} threadId - Thread ID to join
   * @param {number} userId - Current user ID
   */
  joinThread(threadId, userId) {
    if (this.socket?.connected) {
      this.socket.emit("join_thread", {
        thread_id: threadId,
        user_id: userId,
      });
    }
  }

  /**
   * Leave a thread room
   * @param {number} threadId - Thread ID to leave
   * @param {number} userId - Current user ID
   */
  leaveThread(threadId, userId) {
    if (this.socket?.connected) {
      this.socket.emit("leave_thread", {
        thread_id: threadId,
        user_id: userId,
      });
    }
  }

  /**
   * Subscribe to new messages in a thread
   * @param {Function} callback - Callback function(data) where data contains thread_id and message
   */
  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on("new_message", callback);
    }
  }

  /**
   * Unsubscribe from new messages
   * @param {Function} callback - The same callback function used in onNewMessage
   */
  offNewMessage(callback) {
    if (this.socket) {
      this.socket.off("new_message", callback);
    }
  }

  /**
   * Subscribe to user joined events
   * @param {Function} callback - Callback function(data) where data contains user_id and thread_id
   */
  onUserJoined(callback) {
    if (this.socket) {
      this.socket.on("user_joined", callback);
    }
  }

  /**
   * Unsubscribe from user joined events
   * @param {Function} callback - The same callback function used in onUserJoined
   */
  offUserJoined(callback) {
    if (this.socket) {
      this.socket.off("user_joined", callback);
    }
  }

  /**
   * Subscribe to user left events
   * @param {Function} callback - Callback function(data) where data contains user_id and thread_id
   */
  onUserLeft(callback) {
    if (this.socket) {
      this.socket.on("user_left", callback);
    }
  }

  /**
   * Unsubscribe from user left events
   * @param {Function} callback - The same callback function used in onUserLeft
   */
  offUserLeft(callback) {
    if (this.socket) {
      this.socket.off("user_left", callback);
    }
  }

  /**
   * Remove all event listeners
   */
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners("new_message");
      this.socket.removeAllListeners("user_joined");
      this.socket.removeAllListeners("user_left");
    }
  }
}

const socketService = new SocketService();

export default socketService;

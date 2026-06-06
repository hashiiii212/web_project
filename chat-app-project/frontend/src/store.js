import { configureStore, createSlice } from '@reduxjs/toolkit';

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    username: '',
    email: '',
    isAuthenticated: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userId = null;
      state.username = '';
      state.email = '';
      state.isAuthenticated = false;
    }
  }
});

// Chat Slice
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    currentChannel: null,
    typingUsers: [],
    onlineMembers: []
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
      state.messages = [];
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    updateTypingStatus: (state, action) => {
      const { userId, isTyping } = action.payload;
      if (isTyping) {
        if (!state.typingUsers.includes(userId)) {
          state.typingUsers.push(userId);
        }
      } else {
        state.typingUsers = state.typingUsers.filter(id => id !== userId);
      }
    },
    setOnlineMembers: (state, action) => {
      state.onlineMembers = action.payload;
    },
    addMember: (state, action) => {
      if (!state.onlineMembers.includes(action.payload)) {
        state.onlineMembers.push(action.payload);
      }
    },
    removeMember: (state, action) => {
      state.onlineMembers = state.onlineMembers.filter(
        member => member.id !== action.payload
      );
    }
  }
});

// Server Slice
const serverSlice = createSlice({
  name: 'server',
  initialState: {
    servers: [],
    channels: [],
    currentServer: null
  },
  reducers: {
    setServers: (state, action) => {
      state.servers = action.payload;
    },
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setCurrentServer: (state, action) => {
      state.currentServer = action.payload;
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export const { 
  setCurrentChannel, 
  addMessage, 
  setMessages, 
  updateTypingStatus, 
  setOnlineMembers,
  addMember,
  removeMember 
} = chatSlice.actions;
export const { setServers, setChannels, setCurrentServer } = serverSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
    server: serverSlice.reducer
  }
});

export default store;

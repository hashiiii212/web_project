import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

let socket = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });
  }
  return socket;
};

export const getSocket = () => {
  return socket || initializeSocket();
};

export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Socket event listeners
export const setupSocketListeners = (dispatch, actions) => {
  const socket = getSocket();
  
  socket.on('message_new', (data) => {
    dispatch(actions.addMessage(data));
  });
  
  socket.on('user_typing', (data) => {
    dispatch(actions.updateTypingStatus({ 
      userId: data.userId, 
      isTyping: data.isTyping 
    }));
  });
  
  socket.on('presence_update', (data) => {
    if (data.status === 'online') {
      dispatch(actions.addMember(data));
    } else {
      dispatch(actions.removeMember(data.userId));
    }
  });
  
  socket.on('user_joined', (data) => {
    console.log('User joined:', data);
  });
  
  socket.on('user_offline', (data) => {
    console.log('User offline:', data);
  });
};

// Socket emit functions
export const emitSendMessage = (channelId, userId, username, message) => {
  const socket = getSocket();
  socket.emit('send_message', {
    channelId,
    userId,
    username,
    message,
    timestamp: new Date()
  });
};

export const emitJoinChannel = (channelId, userId, username) => {
  const socket = getSocket();
  socket.emit('join_channel', { channelId, userId, username });
};

export const emitTypingStatus = (channelId, userId, username, isTyping) => {
  const socket = getSocket();
  socket.emit('typing_status', { channelId, userId, username, isTyping });
};

export const emitUserPresence = (userId, username, status) => {
  const socket = getSocket();
  socket.emit('user_presence', { userId, username, status });
};

export const emitFileUpload = (channelId, userId, username, fileName, fileSize) => {
  const socket = getSocket();
  socket.emit('file_upload', { channelId, userId, username, fileName, fileSize });
};

export const emitAddReaction = (channelId, messageId, emoji, userId) => {
  const socket = getSocket();
  socket.emit('add_reaction', { channelId, messageId, emoji, userId });
};

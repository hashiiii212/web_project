import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage
const users = new Map();
const servers = new Map();
const channels = new Map();

// Initialize sample data
servers.set('server1', {
  id: 'server1',
  name: 'Main Server',
  icon: '🎮',
  channels: ['general', 'random']
});

channels.set('general', {
  id: 'general',
  name: 'general',
  category: 'text',
  serverId: 'server1',
  messages: []
});

channels.set('random', {
  id: 'random',
  name: 'random',
  category: 'off-topic',
  serverId: 'server1',
  messages: []
});

// REST API endpoints
app.post('/api/auth/register', (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    if (users.has(email)) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const userId = Date.now().toString();
    users.set(email, {
      id: userId,
      username,
      email,
      password,
      status: 'online'
    });
    
    res.json({ 
      success: true, 
      userId, 
      message: 'User registered successfully' 
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = users.get(email);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.json({ 
      success: true, 
      userId: user.id, 
      username: user.username,
      message: 'Login successful' 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/servers', (req, res) => {
  try {
    const serverList = Array.from(servers.values());
    res.json(serverList);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/channels/:serverId', (req, res) => {
  try {
    const { serverId } = req.params;
    const serverChannels = Array.from(channels.values())
      .filter(ch => ch.serverId === serverId);
    res.json(serverChannels);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/messages/:channelId', (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = channels.get(channelId);
    
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    
    res.json(channel.messages || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Socket.io events
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);
  
  socket.on('join_channel', (data) => {
    const { channelId, userId, username } = data;
    socket.join(channelId);
    console.log(`${username} joined ${channelId}`);
    
    io.to(channelId).emit('user_joined', {
      userId,
      username,
      message: `${username} joined the channel`
    });
  });
  
  socket.on('send_message', (data) => {
    const { channelId, userId, username, message, timestamp } = data;
    const channel = channels.get(channelId);
    
    if (channel) {
      const msgObj = {
        id: Date.now().toString(),
        userId,
        username,
        message,
        timestamp,
        reactions: []
      };
      
      if (!channel.messages) {
        channel.messages = [];
      }
      channel.messages.push(msgObj);
      
      console.log(`Message in ${channelId}: ${username}: ${message}`);
      io.to(channelId).emit('message_new', msgObj);
    }
  });
  
  socket.on('typing_status', (data) => {
    const { channelId, userId, username, isTyping } = data;
    socket.to(channelId).emit('user_typing', {
      userId,
      username,
      isTyping
    });
  });
  
  socket.on('user_presence', (data) => {
    const { userId, username, status } = data;
    socket.broadcast.emit('presence_update', {
      userId,
      username,
      status
    });
  });
  
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
    io.emit('user_offline', { socketId: socket.id });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 Chat Backend Server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend should connect to: http://localhost:${PORT}\n`);
});

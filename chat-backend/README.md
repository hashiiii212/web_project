# Chat App Backend

Simple Node.js/Express backend with Socket.io for the chat application.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

You should see:
```
🚀 Chat Backend Server running on http://localhost:5000
📱 Frontend should connect to: http://localhost:5000
```

## ✅ What Works

- ✅ User Registration
- ✅ User Login
- ✅ Get Servers
- ✅ Get Channels by Server
- ✅ Get Messages by Channel
- ✅ Real-time messaging via Socket.io
- ✅ Typing indicators
- ✅ User presence tracking
- ✅ Message reactions

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Data
- `GET /api/servers` - Get all servers
- `GET /api/channels/:serverId` - Get channels for server
- `GET /api/messages/:channelId` - Get messages for channel

### Health
- `GET /health` - Server status check

## 🔌 Socket.io Events

### Listen (Client → Server)
- `send_message` - Send new message
- `typing_status` - User typing indicator
- `join_channel` - Join a channel
- `user_presence` - User online/offline status

### Emit (Server → Client)
- `message_new` - New message received
- `user_typing` - User is typing
- `user_joined` - User joined channel
- `presence_update` - User presence changed

## 📦 Sample Data

Default channels:
- **Server**: Main Server (🎮)
- **Channels**:
  - general (text)
  - random (off-topic)

## 🔐 Note

This is a demo backend with in-memory storage. Data is lost when server restarts.

For production, add:
- Database (MongoDB, PostgreSQL)
- Password hashing (bcrypt)
- JWT authentication
- Environment variables
- Error handling
- Input validation

## 🆘 Troubleshooting

### Port 5000 already in use
```bash
# Find process on port 5000
lsof -i :5000
# Kill it
kill -9 <PID>
```

### CORS errors
Check that frontend URL is allowed in `cors` configuration:
```javascript
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",  // Frontend URL
    methods: ["GET", "POST"]
  }
});
```

### Messages not saving
Server stores messages in memory. Restart clears all data.
Add database for persistence.

## 📄 License

MIT

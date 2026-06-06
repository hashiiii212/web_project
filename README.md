# Chat App

A modern, full-stack chat application built with React and Node.js. Real-time messaging platform with user authentication, server/channel management, and a sleek user interface.

## 🚀 Features

- **User Authentication** - Secure signup and login system
- **Real-time Messaging** - Instant message delivery using WebSockets
- **Multiple Servers** - Create and join different chat servers
- **Channels** - Organize conversations by channels within servers
- **User Profiles** - Personalized user avatars and profiles
- **Member Management** - View and manage server members
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Message History** - Access previous conversations

## 💻 Tech Stack

### Frontend
- **React** - UI library
- **Socket.io Client** - Real-time communication
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Modern JavaScript

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Socket.io** - WebSocket library for real-time events
- **JavaScript** - Backend logic

## 📁 Project Structure

```
chat-app-project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatArea.js
│   │   │   ├── ChannelList.js
│   │   │   ├── MemberList.js
│   │   │   ├── MessageInput.js
│   │   │   ├── MessageItem.js
│   │   │   └── ServerList.js
│   │   ├── pages/
│   │   │   ├── AuthPages.css
│   │   │   ├── LoginPage.js
│   │   │   ├── MainLayout.css
│   │   │   ├── MainLayout.js
│   │   │   └── RegisterPage.js
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── socket.js
│   │   └── store.js
│   ├── public/
│   └── package.json
│
└── chat-backend/
    ├── server.js
    ├── package.json
    └── node_modules/
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd chat-backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 🎮 How to Use

1. **Create an Account**
   - Click "Register" on the login page
   - Enter your username and password
   - Click "Sign Up"

2. **Login**
   - Enter your credentials
   - Click "Login"

3. **Create a Server**
   - Click the "+" button in the server list
   - Enter a server name
   - Click "Create"

4. **Join a Channel**
   - Select a server from the sidebar
   - Click on a channel to view messages
   - Or create a new channel

5. **Send Messages**
   - Type your message in the message input field
   - Press Enter or click Send
   - See your message appear in the chat area in real-time

6. **View Members**
   - See active members in the right sidebar
   - Click on a member to view their profile

## 📡 Real-time Communication

The app uses **Socket.io** for real-time features:
- Messages are delivered instantly
- User presence updates
- Typing indicators
- User join/leave notifications

## 🔐 Security Features

- Password-based authentication
- User sessions
- Server and channel permissions
- Input validation

## 🐛 Troubleshooting

**Backend won't connect:**
- Make sure port 5000 is available
- Check if Node.js is installed: `node --version`

**Frontend won't load:**
- Clear browser cache
- Make sure React is installed: `npm install` in frontend folder
- Check if port 3000 is available

**Messages not sending:**
- Check if backend is running
- Open browser console (F12) to see errors
- Ensure Socket.io connection is established

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - User login

### Messages
- `POST /api/messages` - Send a message
- `GET /api/messages/:channelId` - Get channel messages

### Servers
- `GET /api/servers` - Get user's servers
- `POST /api/servers` - Create new server

### Channels
- `GET /api/channels/:serverId` - Get server channels
- `POST /api/channels` - Create new channel

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

[hashiiii212](https://github.com/hashiiii212)

## 📞 Support

For issues and questions, please open an issue on [GitHub](https://github.com/hashiiii212/web_project/issues)

---

**Happy Chatting!** 💬

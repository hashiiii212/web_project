import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  emitSendMessage, 
  emitTypingStatus,
  emitFileUpload 
} from '../socket';
import './MessageInput.css';

const MessageInput = ({ channelId }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { userId, username } = useSelector(state => state.auth);
  const typingUsers = useSelector(state => state.chat.typingUsers);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    // Emit typing status
    if (value.length > 0 && !isTyping) {
      setIsTyping(true);
      emitTypingStatus(channelId, userId, username, true);
    } else if (value.length === 0 && isTyping) {
      setIsTyping(false);
      emitTypingStatus(channelId, userId, username, false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      emitSendMessage(channelId, userId, username, message.trim());
      setMessage('');
      setIsTyping(false);
      emitTypingStatus(channelId, userId, username, false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      emitFileUpload(channelId, userId, username, file.name, file.size);
    }
  };

  return (
    <div className="message-input-container">
      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          <span>{typingUsers.join(', ')} is typing...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-wrapper">
          <button
            type="button"
            className="input-action"
            title="Add attachment"
            onClick={() => document.getElementById('file-input').click()}
          >
            📎
          </button>

          <input
            type="file"
            id="file-input"
            hidden
            onChange={handleFileUpload}
          />

          <input
            type="text"
            className="message-input"
            placeholder="Message #general..."
            value={message}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
          />

          <button
            type="submit"
            className="send-button"
            disabled={!message.trim()}
            title="Send message"
          >
            📤
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;

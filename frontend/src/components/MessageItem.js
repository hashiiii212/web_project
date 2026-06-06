import React, { useState } from 'react';
import './MessageItem.css';

const MessageItem = ({ message, isOwn }) => {
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  const handleReaction = (emoji) => {
    setSelectedReaction(emoji);
    setShowReactions(false);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message-item ${isOwn ? 'own' : 'other'}`}>
      <div className="message-avatar">
        <div className="avatar-circle">
          {message.username?.charAt(0).toUpperCase() || 'U'}
        </div>
      </div>

      <div className="message-content">
        <div className="message-header">
          <span className="message-author">{message.username}</span>
          <span className="message-timestamp">
            {formatTime(message.timestamp)}
          </span>
        </div>

        <div className="message-text">
          {message.message}
        </div>

        {selectedReaction && (
          <div className="message-reactions">
            <span className="reaction-badge">
              {selectedReaction}
            </span>
          </div>
        )}
      </div>

      <div className="message-actions">
        <button
          className="reaction-button"
          onClick={() => setShowReactions(!showReactions)}
          title="Add reaction"
        >
          😊
        </button>

        {showReactions && (
          <div className="reactions-menu">
            {['👍', '❤️', '😂', '😮', '😢', '🔥'].map((emoji) => (
              <button
                key={emoji}
                className="reaction-option"
                onClick={() => handleReaction(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import MessageItem from './MessageItem';
import MessageInput from './MessageInput';
import MemberList from './MemberList';
import { setMessages } from '../store';
import './ChatArea.css';

const ChatArea = () => {
  const dispatch = useDispatch();
  const { messages, currentChannel } = useSelector(state => state.chat);
  const { userId, username } = useSelector(state => state.auth);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch messages for current channel
    if (currentChannel) {
      fetchMessages(currentChannel.id);
    }
  }, [currentChannel]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async (channelId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/messages/${channelId}`
      );
      dispatch(setMessages(response.data));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!currentChannel) {
    return (
      <div className="chat-area empty">
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h2>Select a channel to start chatting</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="channel-info">
          <h2>{currentChannel.name}</h2>
          <p>{messages.length} messages</p>
        </div>
        <div className="header-actions">
          <button className="icon-button">🔍</button>
          <button className="icon-button">⚙️</button>
        </div>
      </div>

      <div className="messages-container">
        <div className="messages-list">
          {messages.length === 0 ? (
            <div className="no-messages">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                isOwn={message.userId === userId}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <MemberList />
      </div>

      <MessageInput channelId={currentChannel.id} />
    </div>
  );
};

export default ChatArea;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from '../store';
import { emitJoinChannel } from '../socket';
import './ChannelList.css';

const ChannelList = () => {
  const dispatch = useDispatch();
  const { channels } = useSelector(state => state.server);
  const { currentChannel } = useSelector(state => state.chat);
  const { userId, username } = useSelector(state => state.auth);

  const handleChannelClick = (channel) => {
    dispatch(setCurrentChannel(channel));
    emitJoinChannel(channel.id, userId, username);
  };

  // Group channels by category
  const groupedChannels = channels.reduce((acc, channel) => {
    const category = channel.category || 'text';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(channel);
    return acc;
  }, {});

  return (
    <div className="channel-list">
      <div className="channel-header">
        <h3>Channels</h3>
      </div>

      <div className="channel-content">
        {Object.entries(groupedChannels).map(([category, categoryChannels]) => (
          <div key={category} className="channel-category">
            <div className="category-title">
              {category === 'text' && '📝 TEXT CHANNELS'}
              {category === 'voice' && '🎤 VOICE CHANNELS'}
              {category === 'off-topic' && '💬 OFF-TOPIC'}
              {category === 'announcements' && '📢 ANNOUNCEMENTS'}
              {category !== 'text' && 
               category !== 'voice' && 
               category !== 'off-topic' && 
               category !== 'announcements' && category.toUpperCase()}
            </div>

            <div className="channels">
              {categoryChannels.map((channel) => (
                <div
                  key={channel.id}
                  className={`channel-item ${
                    currentChannel?.id === channel.id ? 'active' : ''
                  }`}
                  onClick={() => handleChannelClick(channel)}
                >
                  <span className="channel-icon">
                    {category === 'voice' ? '🔊' : '#'}
                  </span>
                  <span className="channel-name">{channel.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="channel-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <span className="user-name">{username}</span>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;

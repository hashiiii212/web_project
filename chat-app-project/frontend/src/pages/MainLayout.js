import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ServerList from '../components/ServerList';
import ChannelList from '../components/ChannelList';
import ChatArea from '../components/ChatArea';
import {
  setServers,
  setChannels,
  setCurrentServer,
  setCurrentChannel
} from '../store';
import { initializeSocket, setupSocketListeners, emitJoinChannel, emitUserPresence } from '../socket';
import './MainLayout.css';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { servers, currentServer, channels } = useSelector(state => state.server);
  const { userId, username } = useSelector(state => state.auth);

  useEffect(() => {
    // Initialize Socket.io
    initializeSocket();
    
    // Emit user presence
    if (userId && username) {
      emitUserPresence(userId, username, 'online');
    }

    // Fetch servers
    fetchServers();

    return () => {
      emitUserPresence(userId, username, 'offline');
    };
  }, [userId, username]);

  useEffect(() => {
    // Setup socket listeners
    if (userId) {
      setupSocketListeners(dispatch, {
        addMessage: require('../store').addMessage,
        updateTypingStatus: require('../store').updateTypingStatus,
        addMember: require('../store').addMember,
        removeMember: require('../store').removeMember
      });
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // Fetch channels when server changes
    if (currentServer) {
      fetchChannels(currentServer.id);
    }
  }, [currentServer]);

  const fetchServers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/servers');
      dispatch(setServers(response.data));
      
      // Set first server as default
      if (response.data.length > 0) {
        dispatch(setCurrentServer(response.data[0]));
      }
    } catch (error) {
      console.error('Error fetching servers:', error);
    }
  };

  const fetchChannels = async (serverId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/channels/${serverId}`
      );
      dispatch(setChannels(response.data));
      
      // Set first channel as default
      if (response.data.length > 0) {
        dispatch(setCurrentChannel(response.data[0]));
        emitJoinChannel(response.data[0].id, userId, username);
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  return (
    <div className="main-layout">
      <div className="server-rail">
        <ServerList />
      </div>
      
      <div className="channel-sidebar">
        <ChannelList />
      </div>
      
      <div className="chat-container">
        <ChatArea />
      </div>
    </div>
  );
};

export default MainLayout;

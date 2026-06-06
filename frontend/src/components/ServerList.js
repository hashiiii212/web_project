import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentServer } from '../store';
import './ServerList.css';

const ServerList = () => {
  const dispatch = useDispatch();
  const { servers, currentServer } = useSelector(state => state.server);

  const handleServerClick = (server) => {
    dispatch(setCurrentServer(server));
  };

  return (
    <div className="server-list">
      <div className="server-item home-icon" title="Home">
        🏠
      </div>
      
      {servers.map((server) => (
        <div
          key={server.id}
          className={`server-item ${
            currentServer?.id === server.id ? 'active' : ''
          }`}
          onClick={() => handleServerClick(server)}
          title={server.name}
        >
          {server.icon}
        </div>
      ))}
      
      <div className="server-item add-server" title="Add server">
        ➕
      </div>
    </div>
  );
};

export default ServerList;

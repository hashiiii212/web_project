import React from 'react';
import { useSelector } from 'react-redux';
import './MemberList.css';

const MemberList = () => {
  const onlineMembers = useSelector(state => state.chat.onlineMembers);

  // Sample members data
  const members = [
    { id: '1', name: 'Hisham', status: 'online', role: 'Admin' },
    { id: '2', name: 'Ahmad', status: 'online', role: 'Member' },
    { id: '3', name: 'Tor lala', status: 'idle', role: 'Member' },
    { id: '4', name: 'Aizaz', status: 'offline', role: 'Member' },
  ];

  return (
    <div className="member-list">
      <div className="member-header">
        <h3>Members</h3>
        <span className="member-count">{members.length}</span>
      </div>

      <div className="members-container">
        {members.map((member) => (
          <div key={member.id} className={`member-item member-${member.status}`}>
            <div className="member-avatar">
              <div className="avatar-circle">
                {member.name.charAt(0).toUpperCase()}
              </div>
              <span className={`status-indicator ${member.status}`}></span>
            </div>

            <div className="member-info">
              <span className="member-name">{member.name}</span>
              <span className="member-role">{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;

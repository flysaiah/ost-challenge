import React from 'react';
import './Sidebar.css';

const sidebar = (props) => {

  const groupMembers = props.groupMembers.map((d) => {
    return (<p key={d.name}>{d.name}</p>)
  })
  console.log(groupMembers);

  return (
    <div className="sidebar">
      <div className="sidebar-group-info">
        <h1>{props.groupName}</h1>
        <p>Current members: {groupMembers.length}</p>
        {groupMembers}
      </div>
      <div className="sidebar-group-chat">
        <p>Group chat will be implemented in a future update!</p>
      </div>
    </div>
  );
}

export default sidebar;

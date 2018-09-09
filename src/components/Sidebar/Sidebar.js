import React from 'react';
import './Sidebar.css';

const sidebar = (props) => {
  // TODO: Get group name / members from DB
  const groupName = "Goons 98";
  const data = [{name: "Isaiah"},
                        {name: "MC"},
                        {name: "Thomas"}
                        ];

  const groupMembers = data.map((d) => {
    return (<p key={d.name}>{d.name}</p>)
  })

  return (
    <div className="sidebar">
      <div className="sidebar-group-info">
        <h1>{groupName}</h1>
        <p>Current members: 3</p>
        {groupMembers}
      </div>
      <div className="sidebar-group-chat">
        <p>Group chat will be implemented in a future update!</p>
      </div>
    </div>
  );
}

export default sidebar;

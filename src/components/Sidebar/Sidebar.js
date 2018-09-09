import React from 'react';
import Button from '@material-ui/core/Button';
import './Sidebar.css';

const sidebar = (props) => {

  const groupMembers = props.groupMembers.map((d) => {
    return (<p key={d.name}>{d.name}</p>)
  })

  return (
    <div className="sidebar">
      <div className="sidebar-group-info">
        <h1>{props.groupName}</h1>
        <p>Current members: {groupMembers.length}</p>
        {groupMembers}
      </div>
      <div>
      <Button variant="contained" color="secondary"
      onClick={props.handleButtonClick}>Disband Group</Button>
      </div>
      <div className="sidebar-group-chat">
        <p>Group chat will be implemented in a future update!</p>
      </div>
    </div>
  );
}

export default sidebar;

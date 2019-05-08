/*
Status.js
Simple widget that displays guessing status of group
*/

import React from 'react';
import './Status.css'

const status = (props) => {

  const containerClass = props.doneGuessing ? "status-container status-done" : "status-container status-guessing"

  return (
    <div className="card status-card">
      <p>
        <span className={containerClass}>
          {props.doneGuessing ? "Everyone is done guessing!" : "People are still guessing."}
        </span>
      </p>
    </div>
  );
}

export default status;

/*
Clock.js
Simple clock widget that displays London time
*/

import React from 'react';
import Clock from 'react-live-clock';
import './Clock.css'

const clock = (props) => {

  return (
    <div className="card clock-card">
      <p>London time:
        <span className="clock-container">
          <Clock
            format={'h:mm:ss A'}
            ticking={true}
            timezone={'Europe/London'}
          />
        </span>
      </p>
    </div>
  );
}

export default clock;

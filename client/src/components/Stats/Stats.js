/*
Stats.js
Show stats per user
*/

import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import './Stats.css'

const stats = (props) => {

  const displayedStats = props.groupMembers.map((member) => {
    return (<div className="stats-card" key={member.name}><span>{member.name}: {member.numCorrect} / {member.numCorrect + member.numIncorrect}
      </span></div>)
  });

  return (
    <Aux>
      <h1>Stats</h1>
      {displayedStats}
    </Aux>
  );
}

export default stats;

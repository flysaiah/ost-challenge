/*
Stats.js
Show stats per user
*/

import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import './Stats.css'

const stats = (props) => {

  const displayedStats = props.groupMembers.map((member) => {
    return (
    <div key={member.name}>
      <div className="stats-name-card"><span>{member.name}</span></div>
      <div className="stats-score-card">{member.numCorrect} / {member.numCorrect + member.numIncorrect}</div>
    </div>
    )
  });

  return (
    <Aux>
      <h1>Stats</h1>
      {displayedStats}
    </Aux>
  );
}

export default stats;

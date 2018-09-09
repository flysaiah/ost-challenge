import React from 'react';
import Player from '../../components/Player/Player';
import Stats from '../../components/Stats/Stats';
import './PlayerStatsContainer.css'

const playerStatsContainer = (props) => {

  return (
    <div className="card player-stats-container">
      <div className="player-container">
        <Player playlist={props.playlist}
        currentVideoIndex={props.currentVideoIndex}
        playerHidden={props.playerHidden}
        loadNextVideo={props.loadNextVideo}
        />
      </div>
      <div className="stats-container">
        <Stats />
      </div>
    </div>
  );
}

export default playerStatsContainer;

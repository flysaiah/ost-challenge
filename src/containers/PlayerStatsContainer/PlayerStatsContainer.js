import React from 'react';
import Player from '../../components/Player/Player';
import './PlayerStatsContainer.css'

const playerStatsContainer = (props) => {

  return (
    <div className="player-stats-container">
      <div className="player-container">
        <Player playlist={props.playlist}
        currentVideoIndex={props.currentVideoIndex}
        testt={props.testt}
        playerHidden={props.playerHidden}
        loadNextVideo={props.loadNextVideo}
        />
      </div>
      <p>Stats</p>
    </div>
  );
}

export default playerStatsContainer;

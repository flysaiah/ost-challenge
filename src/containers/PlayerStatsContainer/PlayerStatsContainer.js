import React from 'react';
import Player from '../../components/Player/Player';
import Stats from '../../components/Stats/Stats';
import './PlayerStatsContainer.css'

const playerStatsContainer = (props) => {

  return (
    <div className="card player-stats-container">
      <div className="player-container">
        <Player playlist={props.playlist}
        currentPlaylistIndex={props.currentPlaylistIndex}
        playerHidden={props.playerHidden}
        loadNextVideo={props.loadNextVideo}
        isAdmin={props.isAdmin}
        refresh={props.refresh}
        />
      </div>
      <div className="stats-container">
        <Stats />
      </div>
    </div>
  );
}

export default playerStatsContainer;

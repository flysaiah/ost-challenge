/*
PlayerStatsContainer.js
A container that holds both the Player and
the Stats components, and renders them side by side
*/

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
        refresh={props.refresh}
        cannotGuess={props.cannotGuess}
        everyoneReady={props.everyoneReady}
        currentUser={props.currentUser}
        />
      </div>
      <div className="stats-container">
        <Stats
        groupMembers={props.groupMembers}
         />
      </div>
    </div>
  );
}

export default playerStatsContainer;

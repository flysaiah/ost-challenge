/*
Player.js
Youtube player that can play/pause youtube tracks added by users
*/

import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Button from '@material-ui/core/Button';
import YouTube from 'react-youtube';
import './Player.css';

class Player extends Component {

  player = null;
  badURL = false;

  capturePlayer = (event) => {
    this.player = event.target;
  }

  play = (event) => {
    this.player.playVideo();
  }

  pause = (event) => {
    this.player.pauseVideo();
  }

  render() {

    // Options for Youtube player
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
      }
    };
    // Placeholder for various situations
    let placeholder = null;
     if (this.props.playlist.length && this.props.cannotGuess) {
       placeholder = (<p>Sit back and relax! This one isn't for you.</p>);
     } else if (!this.props.playlist.length) {
       placeholder = (<p>Add a track to get started!</p>);
     } else if (this.props.playerHidden) {
       placeholder = (<p>Guess the track to see what this is!</p>);
     }

     let player;
     // Try to validate input; if we can't then show placeholder accordingly
     try {
       const currentVideoID = this.props.currentPlaylistIndex < this.props.playlist.length ? this.props.playlist[this.props.currentPlaylistIndex].url.split("www.youtube.com/watch?v=")[1].split("&")[0] : "";
       player = (
         <Aux>
           <div className="player">
             <YouTube className={!this.props.playlist.length || this.props.playerHidden ? "player-hidden" : "player-regular"}
               videoId={currentVideoID}
               opts={opts}
               onReady={this.capturePlayer}
             />
           </div>
           {placeholder}
         </Aux>
       );
       this.badURL = false;
     } catch(err) {
       this.badURL = true;
       player = (
         <div className="player">
           <p>This is an invalid Youtube URL.</p>
         </div>
       )
     }
    // Only the admin can load the next video
    let loadNextButton = null
    if (this.props.isAdmin) {
      loadNextButton = (
        <Button className="player-button" variant="contained" color="primary"
         disabled={this.props.currentPlaylistIndex >= this.props.playlist.length - 1}
          onClick={this.props.loadNextVideo}>Load Next Video</Button>
      )
    }
    return (
      <Aux>
        <h1>Currently Playing</h1>
        <Button className="player-button" variant="contained" color="primary"
         disabled={!this.props.playlist.length} onClick={this.play}>PLAY</Button>
        <Button className="player-button" variant="contained" color="primary"
         disabled={!this.props.playlist.length} onClick={this.pause}>PAUSE</Button>
        {loadNextButton}
        {player}
      </Aux>
    );
  }
}

export default Player;

/*
Player.js
Youtube player that can play/pause youtube tracks added by users
*/

import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/lab/Slider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import YouTube from 'react-youtube';
import './Player.css';

class Player extends Component {

  state = {
    volume: 50,
    isPaused: true
  }

  player = null;
  badURL = false;

  capturePlayer = (event) => {
    this.player = event.target;
    this.player.setVolume(this.state.volume);
  }

  play = (event) => {
    this.player.playVideo();
    this.setState({
      isPaused: false
    });
  }

  pause = (event) => {
    this.player.pauseVideo();
    this.setState({
      isPaused: true
    });
  }

  setVolume = (event, volume) => {
    this.player.setVolume(volume);
    this.setState({
      volume: volume
    });
  }

  render() {

    // Options for Youtube player
    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        controls: 0,
        disablekb: 1,
        iv_load_policy: 3
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
    if (this.props.playlist.length && (this.props.playlist[this.props.currentPlaylistIndex].owner === this.props.currentUser)) {
      loadNextButton = (
        <Button className="player-button" variant="contained" color="primary"
         disabled={this.props.currentPlaylistIndex >= this.props.playlist.length - 1 || !this.props.everyoneReady}
          onClick={this.props.loadNextVideo}>Load Next Video</Button>
      )
    }
    let posterText = "";
    if (this.props.playlist.length && !this.props.playerHidden) {
      posterText = "Added by: " + this.props.playlist[this.props.currentPlaylistIndex].owner;
    }
    let playPauseButton = (
      <IconButton color="primary" disabled={!this.props.playlist.length} onClick={this.pause}>
        <Pause />
      </IconButton>
    )
    if (this.state.isPaused) {
      playPauseButton = (
        <IconButton color="primary" disabled={!this.props.playlist.length} onClick={this.play}>
          <PlayArrow />
        </IconButton>
      )
    }
    return (
      <Aux>
        <h1>{this.props.playlist.length ? "Currently Playing" : "No Tracks in Playlist"}</h1>
        <p className="player-poster">{posterText}</p>
        {playPauseButton}
        <div className="volume-slider">
          <Slider value={this.state.volume} onChange={this.setVolume} />
        </div>
        {loadNextButton}
        {player}
      </Aux>
    );
  }
}

export default Player;

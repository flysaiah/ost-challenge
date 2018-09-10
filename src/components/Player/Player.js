import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Button from '@material-ui/core/Button';
import YouTube from 'react-youtube';
import './Player.css';

class Player extends Component {

  // TODO: Handle bad URLs

  player = null;

  capturePlayer = (event) => {
    this.player = event.target;
  }

  play = (event) => {
    this.player.playVideo();
  }

  render() {

    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
      }
    };

    const currentVideoID = this.props.currentPlaylistIndex < this.props.playlist.length ? this.props.playlist[this.props.currentPlaylistIndex].url.split("v=")[1].split("&")[0] : "";
    const placeholder = this.props.playlist.length ? (this.props.playerHidden ? (<p>Guess the track to see what this is!</p>) : null) : (<p>Add a track to get started!</p>)
    let loadNextButton = (
      <Button className="player-button" variant="contained" color="primary"
        onClick={this.props.refresh}>Refresh</Button>
    )
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
        {loadNextButton}
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
  }
}

export default Player;

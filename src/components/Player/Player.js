import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import YouTube from 'react-youtube';
import './Player.css';

class Player extends Component {

  // TODO: Handle bad URLs

  player = null;

  capturePlayer = (event) => {
    this.player = event.target;
  }

  play = (event) => {
    console.log(this.player);
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

    const currentVideoID = this.props.currentVideoIndex < this.props.playlist.length ? this.props.playlist[this.props.currentVideoIndex].url.split("v=")[1] : "";

    const placeholder = this.props.playerHidden ? (<p>Guess the track to see what this is!</p>) : null

    return (
      <Aux>
        <h1>Currently Playing</h1>
        <button onClick={this.play}>PLAY</button>
        <button onClick={this.props.testt}>TESTT</button>
        <button disabled={this.props.currentVideoIndex >= this.props.playlist.length - 1}
          onClick={this.props.loadNextVideo}>Load Next Video</button>
        <div className="player">
          <YouTube className={this.props.playerHidden ? "player-hidden" : "player-regular"}
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

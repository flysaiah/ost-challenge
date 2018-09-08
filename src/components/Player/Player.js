import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import YouTube from 'react-youtube';
import './Player.css';

class Player extends Component {

  player = null;

  capturePlayer = (event) => {
    this.player = event.target;
  }

  play = (event) => {
    console.log(this.player);
    this.player.playVideo();
  }

  render() {
    // console.log("--PLAYLIST--");
    // console.log(this.props.playlist);

    const opts = {
      playerVars: { // https://developers.google.com/youtube/player_parameters
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
      }
    };

    const currentVideoID = this.props.playlist[this.props.currentVideoIndex].split("v=")[1];

    return (
      <Aux>
        <h1>Currently Playing</h1>
        <button onClick={this.play}>PLAY</button>
        <button onClick={this.props.testt}>TESTT</button>
        <button disabled={this.props.currentVideoIndex >= this.props.playlist.length - 1}
          onClick={this.props.loadNextVideo}>Load Next Video</button>
        <div className="player-container">
          <YouTube className={this.props.playerHidden ? "player-hidden" : "player-regular"}
            videoId={currentVideoID}
            opts={opts}
            onReady={this.capturePlayer}
          />
        </div>
      </Aux>
    );
  }
}

export default Player;

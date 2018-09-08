import React, { Component } from 'react';
import PlayerStatsContainer from '../PlayerStatsContainer/PlayerStatsContainer';

class ChallengeInterface extends Component {

  state = {
    playlist: ["https://www.youtube.com/watch?v=MvHK2OWkCFg",
              "https://www.youtube.com/watch?v=CwXXsSg4p-s"],
    currentVideoIndex: 0,
    playerHidden: false,
    numGuesses: 3
  }

  testt() {
    this.setState({
      ...this.state,
      playerHidden: !this.state.playerHidden
    });
  }

  loadNextVideo() {
    this.setState({
      ...this.state,
      currentVideoIndex: this.state.currentVideoIndex + 1
    })
  }

  render () {
    return (
      <div>
        <PlayerStatsContainer
         playlist={this.state.playlist}
         currentVideoIndex={this.state.currentVideoIndex}
         testt={this.testt.bind(this)}
         playerHidden={this.state.playerHidden}
         loadNextVideo={this.loadNextVideo.bind(this)}
        />
      </div>
    );
  }
}

export default ChallengeInterface;

import React, { Component } from 'react';
import PlayerStatsContainer from '../PlayerStatsContainer/PlayerStatsContainer';

class ChallengeInterface extends Component {

  state = {
    playlist: ["https://www.youtube.com/watch?v=MvHK2OWkCFg"],
    playerHidden: false,
    numGuesses: 3
  }

  testt() {
    this.setState({
      ...this.state,
      playerHidden: !this.state.playerHidden
    });
  }

  render () {
    return (
      <div>
        <PlayerStatsContainer
         playlist={this.state.playlist}
         testt={this.testt.bind(this)}
         playerHidden={this.state.playerHidden}
        />
      </div>
    );
  }
}

export default ChallengeInterface;

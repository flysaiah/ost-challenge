import React, { Component } from 'react';
import PlayerStatsContainer from '../PlayerStatsContainer/PlayerStatsContainer';
import AddNewTrack from '../../components/AddNewTrack/AddNewTrack';
import './ChallengeInterface.css';

class ChallengeInterface extends Component {

  state = {
    playlist: ["https://www.youtube.com/watch?v=MvHK2OWkCFg",
              "https://www.youtube.com/watch?v=CwXXsSg4p-s"],
    currentVideoIndex: 0,
    playerHidden: false,
    numGuesses: 3,
    newTrackURL: ""
  }

  testt() {
    this.setState({
      playerHidden: !this.state.playerHidden
    });
  }

  loadNextVideo() {
    this.setState({
      currentVideoIndex: this.state.currentVideoIndex + 1
    })
  }

  addTrackToPlaylist = () => {
    const newPlaylist = [...this.state.playlist, this.state.newTrackURL];
    this.setState({
      playlist: newPlaylist,
      newTrackURL: ""
    });
  }

  setNewTrackURL = (event) => {
    this.setState({
      newTrackURL: event.target.value,
    })
  }

  render () {
    return (
      <div>
        <div>
          <PlayerStatsContainer
           playlist={this.state.playlist}
           currentVideoIndex={this.state.currentVideoIndex}
           testt={this.testt.bind(this)}
           playerHidden={this.state.playerHidden}
           loadNextVideo={this.loadNextVideo.bind(this)}
          />
        </div>
        <div className="bottom-row-container">
          <AddNewTrack
          playlist={this.state.playlist}
          inputChangeHandler={this.setNewTrackURL}
          handleButtonClick={this.addTrackToPlaylist}
          newTrackURL={this.state.newTrackURL}
          />
        </div>
      </div>
    );
  }
}

export default ChallengeInterface;

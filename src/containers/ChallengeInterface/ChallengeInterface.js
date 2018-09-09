import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import PlayerStatsContainer from '../PlayerStatsContainer/PlayerStatsContainer';
import AddNewTrack from '../../components/AddNewTrack/AddNewTrack';
import Guesser from '../../components/Guesser/Guesser';
import axios from 'axios';
import Clock from '../../components/Clock/Clock';
import TextField from '@material-ui/core/TextField';
import './ChallengeInterface.css';

class ChallengeInterface extends Component {

  state = {
    playlist: [],
    currentVideoIndex: 0,
    playerHidden: false,
    numGuesses: 3,
    newTrackURL: "",
    groupName: "",
    groupMembers: [],
    currentUser: ""
  }

  componentDidMount() {
    const groupName = localStorage.getItem("ost-challenge-group-name");
    const currentUser = localStorage.getItem("ost-challenge-current-user");
    if (!groupName || !currentUser) {
      this.props.history.push('/joinGroup');
      return;
    }
    axios.post('http://localhost:3131/api/fetchSessionData', { groupName: groupName }).then(res => {
      if (res.data.success) {
        console.log(res.data);
        this.setState({
          groupName: groupName,
          groupMembers: res.data.session.members,
          currentUser: currentUser,
          playlist: res.data.session.playlist,
        });
      } else if (res.data.message === "Group not found") {
        localStorage.setItem("ost-challenge-group-name", "")
        localStorage.setItem("ost-challenge-current-user", "")
        this.props.history.push('/joinGroup');
        return;
      } else {
        // TODO: Toast
        console.log(res);
      }
    });
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
      <div className="challenge-interface-full-container">
        <Sidebar groupName={this.state.groupName} groupMembers={this.state.groupMembers} />
        <div className="challenge-interface-right-container">
          <header className="App-header">
            <h1 className="App-title">My OST Challenge, Your Beats!</h1>
          </header>
          <div className="challenger-interface">
            <div className="top-row-container">
              <Clock />
            </div>
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
              <Guesser
                numGuesses={this.state.numGuesses}
              />
              <div className="card bottom-card">
                <h1>Scratchwork</h1>
                <div className="add-new-track-input">
                  <TextField label="Put ideas here" multiline margin="normal"/>
                </div>
              </div>
              <AddNewTrack
              playlist={this.state.playlist}
              inputChangeHandler={this.setNewTrackURL}
              handleButtonClick={this.addTrackToPlaylist}
              newTrackURL={this.state.newTrackURL}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChallengeInterface;

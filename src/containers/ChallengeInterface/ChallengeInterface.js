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
    currentPlaylistIndex: 0,
    playerHidden: false,
    numGuesses: 3,
    newTrackURL: "",
    groupName: "",
    groupAdmin: "",
    groupMembers: [],
    currentUser: "",
    canGuessOptions: {}
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = (event) => {
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
          groupAdmin: res.data.session.groupAdmin,
          groupMembers: res.data.session.members,
          currentUser: currentUser,
          playlist: res.data.session.playlist,
          currentPlaylistIndex: res.data.session.currentPlaylistIndex
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

  loadNextVideo() {
    const newPlaylistIndex = this.state.currentPlaylistIndex + 1;
    axios.post('http://localhost:3131/api/setnewPlaylistIndex', { groupName: this.state.groupName, currentPlaylistIndex: newPlaylistIndex }).then(res => {
      if (res.data.success) {
        const newPlaylist = res.data.playlist;
        const nextVideo = newPlaylist[newPlaylistIndex];
        let playerHidden = true;
        if (nextVideo.owner === this.state.currentUser) {
          playerHidden = false;
        } else if (nextVideo.canGuess) {
          for (let member of nextVideo.canGuess) {
            if (member === this.state.currentUser) {
              playerHidden = false;
              break;
            }
          }
        }
        this.setState({
          currentPlaylistIndex: newPlaylistIndex,
          playlist: res.data.playlist,
          playerHidden: playerHidden
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

  addTrackToPlaylist = () => {
    const canGuess = [];
    for (let groupMember of this.state.groupMembers) {
      if (this.state.canGuessOptions[groupMember.name]) {
        canGuess.push(groupMember.name)
      }
    }
    const newTrack = {
      url: this.state.newTrackURL,
      canGuess: canGuess,
      owner: this.state.currentUser
    }

    axios.post('http://localhost:3131/api/addVideoToPlaylist', { groupName: this.state.groupName, newTrack: newTrack }).then(res => {
      if (res.data.success) {
        console.log(res.data);
        this.setState({
          playlist: res.data.playlist,
          newTrackURL: ""
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

  setNewTrackURL = (event) => {
    this.setState({
      newTrackURL: event.target.value,
    })
  }

  disbandGroup = (event) => {
    const body = {
      groupName: this.state.groupName
    }
    axios.post('http://localhost:3131/api/disbandGroup', body).then(res => {
      if (res.data.success) {
        localStorage.setItem("ost-challenge-group-name", "");
        localStorage.setItem("ost-challenge-current-user", "");
        this.props.history.push("/joinGroup");
      } else {
        // TODO: Toast
        console.log(res);
      }
    });
  }

  checkboxChange = (memberName) => {
    const newCanGuessOptions = {
      ...this.state.canGuessOptions
    }
    if (newCanGuessOptions[memberName]) {
      newCanGuessOptions[memberName] = false;
    } else {
      newCanGuessOptions[memberName] = true;
    }
    this.setState({
      canGuessOptions: newCanGuessOptions
    });
  }

  render () {
    return (
      <div className="challenge-interface-full-container">
        <Sidebar groupName={this.state.groupName} groupMembers={this.state.groupMembers}
        handleButtonClick={this.disbandGroup} />
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
               currentPlaylistIndex={this.state.currentPlaylistIndex}
               playerHidden={this.state.playerHidden}
               loadNextVideo={this.loadNextVideo.bind(this)}
               refresh={this.refresh}
               isAdmin={this.state.currentUser === this.state.groupAdmin}
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
              groupMembers={this.state.groupMembers}
              checkboxChange={this.checkboxChange}
              canGuessOptions={this.state.canGuessOptions}
              currentUser={this.state.currentUser}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChallengeInterface;

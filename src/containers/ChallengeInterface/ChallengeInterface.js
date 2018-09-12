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
    newGuess: "",
    newTrackURL: "",
    groupName: "",
    groupAdmin: "",
    groupMembers: [],
    currentUser: "",
    canGuessOptions: {},
    waitingOnEval: false
  }

  interval = null;

  componentDidMount() {
    this.refresh();
    this.interval = setInterval(this.refresh, 2000);
  }

  refresh = (event) => {
    console.log("YAY");
    const groupName = localStorage.getItem("ost-challenge-group-name");
    const currentUser = localStorage.getItem("ost-challenge-current-user");
    if (!groupName || !currentUser) {
      this.props.history.push('/joinGroup');
        clearInterval(this.interval);
      return;
    }
    axios.post('http://localhost:3131/api/fetchSessionData', { groupName: groupName }).then(res => {
      if (res.data.success) {
        console.log(res.data);
        let playerHidden = true;
        if (res.data.session.playlist.length) {
          const nextVideo = res.data.session.playlist[res.data.session.currentPlaylistIndex];
          if (nextVideo.owner === currentUser) {
            playerHidden = false;
          }
        }
        let waitingOnEval = false;
        let numGuesses = 3;
        for (let member of res.data.session.members) {
          if (member.name === currentUser) {
            numGuesses = member.numGuesses
            waitingOnEval = member.waitingOnEval;
            if (member.guessStatus === 3) {
              playerHidden = false;
            }
          }
        }
        this.setState({
          groupName: groupName,
          groupAdmin: res.data.session.groupAdmin,
          groupMembers: res.data.session.members,
          currentUser: currentUser,
          playlist: res.data.session.playlist,
          currentPlaylistIndex: res.data.session.currentPlaylistIndex,
          playerHidden: playerHidden,
          waitingOnEval: waitingOnEval,
          numGuesses: numGuesses
        });
      } else if (res.data.message === "Group not found") {
        this.props.history.push('/joinGroup');
        clearInterval(this.interval);
        return;
      } else {
        // TODO: Toast
        console.log(res);
      }
    }).catch(error => {
      console.log(error);
      console.log(":()")
    });
  }

  loadNextVideo() {
    const newPlaylistIndex = this.state.currentPlaylistIndex + 1;
    axios.post('http://localhost:3131/api/setnewPlaylistIndex', { groupName: this.state.groupName, currentPlaylistIndex: newPlaylistIndex }).then(res => {
      if (res.data.success) {
        this.refresh();
      } else if (res.data.message === "Group not found") {
        this.props.history.push('/joinGroup');
        clearInterval(this.interval);
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
        this.props.history.push('/joinGroup');
        clearInterval(this.interval);
        return;
      } else {
        // TODO: Toast
        console.log(res);
      }
    }).catch(error => {
      console.log(error);
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
        clearInterval(this.interval);
      } else {
        // TODO: Toast
        console.log(res);
      }
    });
  }

  acceptGuess = (memberName) => {
    const body = { groupName: this.state.groupName, memberName: memberName, guessStatus: 3 }
    axios.post('http://localhost:3131/api/evaluateGuess', body).then(res => {
      if (res.data.success) {
        this.refresh();
      } else {
        // TODO: Toast
        console.log(res);
      }
    });
  }

  rejectGuess = (memberName) => {
    const body = { groupName: this.state.groupName, memberName: memberName, guessStatus: 2 }
    axios.post('http://localhost:3131/api/evaluateGuess', body).then(res => {
      if (res.data.success) {
        this.refresh();
      } else {
        // TODO: Toast
        console.log(res);
      }
    });
  }

  makeGuess = (event) => {
    axios.post('http://localhost:3131/api/makeGuess', { groupName: this.state.groupName, newGuess: this.state.newGuess, name: this.state.currentUser }).then(res => {
      if (res.data.success) {
        this.refresh();
      } else if (res.data.message === "Group not found") {
        localStorage.setItem("ost-challenge-group-name", "")
        localStorage.setItem("ost-challenge-current-user", "")
        this.props.history.push('/joinGroup');
        clearInterval(this.interval);
        return;
      } else {
        // TODO: Toast
        console.log(res);
      }
    });
  }

  changeGuess = (event) => {
    this.setState({
      newGuess: event.target.value
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
    let cannotGuess = true;
    if (this.state.playlist.length) {
      if (this.state.playlist[this.state.currentPlaylistIndex].owner === this.state.currentUser) {
        cannotGuess = false;
      } else {
        for (let member of this.state.playlist[this.state.currentPlaylistIndex].canGuess) {
          if (member === this.state.currentUser) {
            cannotGuess = false;
            break;
          }
        }
      }
    }
    let guessStatus;
    for (let member of this.state.groupMembers) {
      if (member.name === this.state.currentUser) {
        guessStatus = member.guessStatus;
      }
    }
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
               cannotGuess={cannotGuess}
               groupMembers={this.state.groupMembers}
              />
            </div>
            <div className="bottom-row-container">
              <Guesser
                numGuesses={this.state.numGuesses}
                groupMembers={this.state.groupMembers}
                currentVideo={this.state.playlist.length ? this.state.playlist[this.state.currentPlaylistIndex] : null}
                currentUser={this.state.currentUser}
                newGuess={this.state.newGuess}
                inputChangeHandler={this.changeGuess}
                handleButtonClick={this.makeGuess}
                acceptGuess={this.acceptGuess}
                rejectGuess={this.rejectGuess}
                waitingOnEval={this.state.waitingOnEval}
                cannotGuess={cannotGuess}
                guessStatus={guessStatus}
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

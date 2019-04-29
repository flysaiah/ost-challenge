/*
ChallengeInterface.js
The main container that contains both the main state of the
application and holds all the components/containers
*/

import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import PlayerStatsContainer from '../PlayerStatsContainer/PlayerStatsContainer';
import AddNewTrack from '../../components/AddNewTrack/AddNewTrack';
import Guesser from '../../components/Guesser/Guesser';
import Hints from '../../components/Hints/Hints';
import axios from 'axios';
import './ChallengeInterface.css';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['crossDomain'] = true;

class ChallengeInterface extends Component {

  state = {
    playlist: [],
    currentPlaylistIndex: 0,
    playerHidden: false,
    numGuesses: 3,   // Number of guesses the current user has left for this song
    newGuess: "",
    newTrackURL: "",
    groupName: "",
    groupMembers: [],
    currentUser: "",
    canGuessOptions: {},   // Keys will be names of group members, value is true if they can guess the about-to-be-added track
    waitingOnEval: false,
    newHint: ""
  }

  interval = null;   // Used for refreshing page every 2 seconds

  componentDidMount() {
    this.refresh();
    this.interval = setInterval(this.refresh, 2000);
  }

  refresh = (event) => {
    // Always start by making sure current user is "logged in"; if not then kick them out
    const groupName = localStorage.getItem("ost-challenge-group-name");
    const currentUser = localStorage.getItem("ost-challenge-current-user");
    if (!groupName || !currentUser) {
      this.props.history.push('/joinGroup');
      clearInterval(this.interval);
      return;
    }
    axios.post('/api/fetchSessionData', { groupName: groupName }).then(res => {
      if (res.data.success) {
        // Player should be hidden unless they added the video or have permission to guess
        let playerHidden = true;
        if (res.data.session.playlist.length) {
          const nextVideo = res.data.session.playlist[res.data.session.currentPlaylistIndex];
          if (nextVideo.owner === currentUser) {
            playerHidden = false;
          }
        }
        // waitingOnEval is true if they sent a guess and are waiting for it to be evaluated
        let waitingOnEval = false;
        let numGuesses = 3;
        for (let member of res.data.session.members) {
          if (member.name === currentUser) {
            numGuesses = member.numGuesses
            waitingOnEval = member.waitingOnEval;
            if (member.guessStatus === 3 || (member.guessStatus === 2 && member.numGuesses === 0)) {
              playerHidden = false;
            }
          }
        }
        this.setState({
          groupName: groupName,
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
      } else {
        // TODO: Toast
        console.log(res);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  loadNextVideo() {
    // Increment playlist index & refresh to make sure everything is correct
    const newPlaylistIndex = this.state.currentPlaylistIndex + 1;
    axios.post('/api/setnewPlaylistIndex', { groupName: this.state.groupName, currentPlaylistIndex: newPlaylistIndex }).then(res => {
      if (res.data.success) {
        this.refresh();
      } else if (res.data.message === "Group not found") {
        this.props.history.push('/joinGroup');
        clearInterval(this.interval);
      } else {
        // TODO: Toast
        console.log(res);
      }
    });
  }

  addTrackToPlaylist = () => {
    // First generate canGuess array for new track, then add to database
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

    axios.post('/api/addVideoToPlaylist', { groupName: this.state.groupName, newTrack: newTrack }).then(res => {
      if (res.data.success) {
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
    axios.post('/api/disbandGroup', body).then(res => {
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
    axios.post('/api/evaluateGuess', body).then(res => {
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
    axios.post('/api/evaluateGuess', body).then(res => {
      if (res.data.success) {
        this.refresh();
      } else {
        // TODO: Toast
        console.log(res);
      }
    });
  }

  makeGuess = (event) => {
    axios.post('/api/makeGuess', { groupName: this.state.groupName, newGuess: this.state.newGuess, name: this.state.currentUser }).then(res => {
      if (res.data.success) {
        this.refresh();
      } else if (res.data.message === "Group not found") {
        localStorage.setItem("ost-challenge-group-name", "")
        localStorage.setItem("ost-challenge-current-user", "")
        this.props.history.push('/joinGroup');
        clearInterval(this.interval);
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

  changeHint = (event) => {
    this.setState({
      newHint: event.target.value
    })
  }

  setReadyForNext = (event) => {
    // Lets admin know they can move on to the next index
    axios.post('/api/setReadyForNext', { groupName: this.state.groupName, memberName: this.state.currentUser }).then(res => {
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
    }).catch(error => {
      console.log(error);
    });
  }

  checkboxChange = (memberName) => {
    // Used in <AddNewTrack/> component; maps canGuessOptions to checkboxes list
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

  provideHint = () => {
    const hint = this.state.newHint;
    this.setState({
      newHint: ""
    });
    axios.post('/api/provideHint', { groupName: this.state.groupName, hint: hint }).then(res => {
      if (res.data.success) {
        // nothing to do for success
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

  render () {
    // User can't guess if they added the current video or if they weren't given permission by the adder
    let cannotGuess = true;
    let isOwner = false;
    if (this.state.playlist.length) {
      if (this.state.playlist[this.state.currentPlaylistIndex].owner === this.state.currentUser) {
        cannotGuess = false;
        isOwner = true;
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
    let everyoneReady = true;
    for (let member of this.state.groupMembers) {
      if (member.name === this.state.currentUser) {
        guessStatus = member.guessStatus;
      } else {
        if (!member.readyForNext) {
          everyoneReady = false;
        }
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
            <div>
              <PlayerStatsContainer
               playlist={this.state.playlist}
               currentPlaylistIndex={this.state.currentPlaylistIndex}
               playerHidden={this.state.playerHidden}
               loadNextVideo={this.loadNextVideo.bind(this)}
               refresh={this.refresh}
               cannotGuess={cannotGuess}
               groupMembers={this.state.groupMembers}
               everyoneReady={everyoneReady}
               currentUser={this.state.currentUser}
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
                setReadyForNext={this.setReadyForNext}
                isOwner={isOwner}
              />
              <Hints
                hints={this.state.playlist.length ? this.state.playlist[this.state.currentPlaylistIndex].hints : null}
                cannotGuess={cannotGuess}
                provideHint={this.provideHint}
                isOwner={isOwner}
                newHint={this.state.newHint}
                inputChangeHandler={this.changeHint}
              />
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

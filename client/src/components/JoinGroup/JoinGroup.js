/*
JoinGroup.js
Simple form to join a group
*/

import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class JoinGroup extends Component {

  state = {
    groupPassword: "",
    newUser: "",
    snackbarOpen: false,
    snackBarMessage: ""
  }

  groupPasswordChanged = (event) => {
    this.setState({
      groupPassword: event.target.value,
    });
  }

  yourNameChanged = (event) => {
    this.setState({
      newUser: event.target.value,
    });
  }

  goToCreateGroup = (event) => {
    this.props.history.push("/createGroup");
  }

  // For error messages
  displaySnackbar = (message) => {
    this.setState({
      snackbarOpen: true,
      snackBarMessage: message
    });
    setTimeout(() => {
      this.setState({
        snackbarOpen: false,
        snackBarMessage: ""
      });
    }, 3000)
  }

  joinGroup = (event) => {
    const body = {
      groupPassword: this.state.groupPassword,
      newUser: this.state.newUser
    }
    axios.post('/api/joinGroup', body).then(res => {
      if (res.data.success) {
        localStorage.setItem("ost-challenge-group-name", res.data.groupName);
        localStorage.setItem("ost-challenge-current-user", body.newUser);
        this.props.history.push("/");
      } else if (res.data.message === "Group not found") {
        // TODO: Message
        this.displaySnackbar("Incorrect Password");
      } else {
        // TODO: Toast
        console.log(res);
      }
    }).catch(error => {
      console.log(error);
    });;
  }

  render() {

    const snackbar = (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={this.state.snackbarOpen}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.snackBarMessage}</span>}
      />
    )

    return (
      <div className="create-group-container">
        <div className="create-group card">
          <h1>Join Group</h1>
          <div className="add-new-track-input">
            <TextField label="Group Password" value={this.state.groupPassword}
            onChange={this.groupPasswordChanged} margin="normal"/>
            <br/>
            <TextField label="Your Name" value={this.state.newUser}
            onChange={this.yourNameChanged} margin="normal"/>
          </div>
          <Button variant="contained" color="primary" disabled={!this.state.groupPassword || !this.state.newUser }
          onClick={this.joinGroup}>Join Group</Button>
          <br/>
          <br/>
          <Button variant="contained" color="primary"
          onClick={this.goToCreateGroup}>Create Group</Button>
        </div>
        {snackbar}
      </div>
    );
  }
}

export default JoinGroup;

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './CreateGroup.css'

class createGroup extends Component {

  state = {
    newGroupName: "",
    newGroupPassword: "",
    newUser: ""
  }

  groupNameChanged = (event) => {
    this.setState({
      newGroupName: event.target.value,
    });
  }

  groupPasswordChanged = (event) => {
    this.setState({
      newGroupPassword: event.target.value,
    });
  }

  yourNameChanged = (event) => {
    this.setState({
      newUser: event.target.value,
    });
  }

  createGroup = (event) => {
    const body = {
      groupName: this.state.newGroupName,
      groupPassword: this.state.newGroupPassword,
      newUser: this.state.newUser
    }
    axios.post('/api/createGroup', body).then(res => {
      if (res.data.success) {
        localStorage.setItem("ost-challenge-group-name", body.groupName);
        localStorage.setItem("ost-challenge-current-user", body.newUser);
        this.props.history.push("/");
      } else {
        // TODO: Toast
        console.log(res);
      }
    });
  }

  render() {
    return (
      <div className="create-group card">
        <h1>Create a Group</h1>
        <div className="add-new-track-input">
          <TextField label="Group Name" value={this.state.newGroupName}
          onChange={this.groupNameChanged} margin="normal"/>
          <br/>
          <TextField label="Group Password" value={this.state.groupPassword}
          onChange={this.groupPasswordChanged} margin="normal"/>
          <br/>
          <TextField label="Your Name" value={this.state.newUser}
          onChange={this.yourNameChanged} margin="normal"/>
        </div>
        <Button variant="contained" color="primary" disabled={!this.state.newGroupName || !this.state.newGroupPassword || !this.state.newUser }
        onClick={this.createGroup}>Create Group</Button>
      </div>
    );
  }
}

export default createGroup;

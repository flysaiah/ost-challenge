import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AddNewTrack.css';

const addNewTrack = (props) => {

  let newTrackURL = ""

  return (
    <div className="card add-new-track-container">
      <h1>Add New Track</h1>
      <div className="add-new-track-input">
        <TextField label="Youtube URL" value={props.newTrackURL}
        onChange={props.inputChangeHandler} margin="normal"/>
      </div>
      <Button
      variant="contained" color="primary" onClick={props.handleButtonClick}>Add Track</Button>
    </div>
  );
}

export default addNewTrack;

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AddNewTrack.css';

const addNewTrack = (props) => {

  return (
    <div className="card bottom-card">
      <h1>Add New Track</h1>
      <div className="add-new-track-input">
        <TextField label="Youtube URL" value={props.newTrackURL}
        onChange={props.inputChangeHandler} margin="normal"/>
      </div>
      <Button variant="contained" color="primary" disabled={!props.newTrackURL}
      onClick={props.handleButtonClick}>Add Track</Button>
    </div>
  );
}

export default addNewTrack;

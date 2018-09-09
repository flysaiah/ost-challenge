import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import './AddNewTrack.css';

const addNewTrack = (props) => {

  const checkboxes = props.groupMembers.map((member) => {
    return (<FormControlLabel
        control={
          <Checkbox
            checked={props.canGuessOptions[member.name]}
            onChange={props.checkboxChange.bind(member.name, member.name)}
            value={member.name}
            color="primary"
          />
        }
        label={member.name}
        labelPlacement="start"
        key={member.name}
      />)
  })

  return (
    <div className="card bottom-card">
      <h1>Add New Track</h1>
      <div className="add-new-track-input">
        <TextField label="Youtube URL" value={props.newTrackURL}
        onChange={props.inputChangeHandler} margin="normal"/>
      </div>
      <div className="new-track-can-guess-container">
        <span className="can-guess-text">Group members who can guess:</span>
        <div className="checkboxes-container">
          <FormGroup row>
          {checkboxes}
          </FormGroup>
        </div>
      </div>
      <Button variant="contained" color="primary" disabled={!props.newTrackURL}
      onClick={props.handleButtonClick}>Add Track</Button>
    </div>
  );
}

export default addNewTrack;

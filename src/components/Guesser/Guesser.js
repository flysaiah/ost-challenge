import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Guesser.css'

const guesser = (props) => {

  return (
    <div className="card bottom-card">
      <h1>{props.numGuesses} Guesses Left</h1>
      <div className="add-new-track-input">
        <TextField label="Write guess here" value={props.newGuess}
        onChange={props.inputChangeHandler} margin="normal"/>
      </div>
      <Button variant="contained" color="primary" disabled={!props.newGuess}
      onClick={props.handleButtonClick}>Make Guess</Button>
    </div>
  );
}

export default guesser;

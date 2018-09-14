/*
Guesser.js
Show stats per user
*/

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Aux from '../../hoc/Aux/Aux';
import './Guesser.css'

const guesser = (props) => {

  let guessInterface = null;

  if (props.currentVideo && props.currentUser === props.currentVideo.owner) {
    // Confirm/deny guesses
    const guessingMembers = [];
    for (let member of props.groupMembers) {
      if (member.name !== props.currentUser) {
        guessingMembers.push(member);
      }
    }

    const guesses = guessingMembers.map((member) => {
        const guess = (member.newGuess && member.waitingOnEval) ? member.newGuess : "No current guess";
        return (
          <div className="guess-container" key={member.name}>
            {member.name}'s guess: {guess}
            <div className="guess-buttons-container">
              <Button className="guess-button" variant="contained" color="primary" disabled={!member.newGuess || !member.waitingOnEval}
              onClick={props.acceptGuess.bind(member.name, member.name)}>Accept</Button>
              <Button className="guess-button" variant="contained" color="secondary" disabled={!member.newGuess || !member.waitingOnEval}
              onClick={props.rejectGuess.bind(member.name, member.name)}>Reject</Button>
            </div>
          </div>
        )
    });
    guessInterface = (
      <Aux>
        <h1>Accept/Reject Guesses</h1>
        {guesses}
      </Aux>
    )
  } else {
    let guessInput = (
      <p>Waiting on evaluation of your guess!</p>
    );

    // Multiple situations, depending on if user is the owner of the video / can vs cannot guess
    if (!props.waitingOnEval && props.guessStatus === 1 && !props.cannotGuess) {
      guessInput = (
        <Aux>
          <div className="add-new-track-input">
            <TextField label="Write guess here" value={props.newGuess}
            onChange={props.inputChangeHandler} margin="normal"/>
          </div>
          <Button variant="contained" color="primary" disabled={!props.newGuess || props.numGuesses <= 0}
          onClick={props.handleButtonClick}>Make Guess</Button>
        </Aux>
      )
    } else if (!props.waitingOnEval && props.guessStatus === 2) {
      guessInput = (
        <Aux>
          <p>You were incorrect.</p>
          <br/>
          <div className="add-new-track-input">
            <TextField label="Write guess here" value={props.newGuess}
            onChange={props.inputChangeHandler} margin="normal"/>
          </div>
          <Button variant="contained" color="primary" disabled={!props.newGuess || props.numGuesses <= 0}
          onClick={props.handleButtonClick}>Make Guess</Button>
        </Aux>
      )
    } else if (!props.waitingOnEval && props.guessStatus === 3) {
      guessInput = (
        <Aux>
          You were correct!
        </Aux>
      )
    } else if (!props.waitingOnEval && props.cannotGuess) {
      guessInput = (
        <p>You can't guess this one.</p>
      );
    }

    guessInterface = (
      <Aux>
        <h1>{props.numGuesses} Guesses Left</h1>
        {guessInput}
      </Aux>
    );
  }

  return (
    <div className="card bottom-card">
      {guessInterface}
    </div>
  );
}

export default guesser;

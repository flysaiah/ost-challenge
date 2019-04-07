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
  let readyForNextDisabled = true;

  for (let member of props.groupMembers) {
    if (member.name === props.currentUser) {
      // ReadyForNext button is enabled if they are done guessing
      if (!member.readyForNext && ((member.guessStatus === 3 || (member.numGuesses === 0 && member.guessStatus !== 1) || props.cannotGuess))) {
        readyForNextDisabled = false;
      }
    }
  }

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
      let content = (
        <Aux>
          {member.name}'s guess: {guess}
          <div className="guess-buttons-container">
            <Button className="guess-button" variant="contained" color="primary" disabled={!member.newGuess || !member.waitingOnEval}
              onClick={props.acceptGuess.bind(member.name, member.name)}>Accept</Button>
            <Button className="guess-button" variant="contained" color="secondary" disabled={!member.newGuess || !member.waitingOnEval}
              onClick={props.rejectGuess.bind(member.name, member.name)}>Reject</Button>
          </div>
        </Aux>
      );
      if ((member.numGuesses === 0 && !member.waitingOnEval) || member.guessStatus === 3) {
        content = (
          <Aux>
            {member.name}: No more guesses
        </Aux>
        )
      }
      return (
        <div className="guess-container" key={member.name}>
          {content}
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
          <div className="guess-input">
            <TextField label="Write guess here" value={props.newGuess}
              onChange={props.inputChangeHandler} margin="normal" />
          </div>
          <Button variant="contained" color="primary" disabled={!props.newGuess || props.numGuesses <= 0}
            onClick={props.handleButtonClick}>Make Guess</Button>
          <br />
        </Aux>
      )
    } else if (!props.waitingOnEval && props.guessStatus === 2) {
      guessInput = (
        <Aux>
          <p>You were incorrect.</p>
          <br />
          <div className="guess-input">
            <TextField label="Write guess here" value={props.newGuess}
              onChange={props.inputChangeHandler} margin="normal" />
          </div>
          <Button variant="contained" color="primary" disabled={!props.newGuess || props.numGuesses <= 0}
            onClick={props.handleButtonClick}>Make Guess</Button>
          <br />
        </Aux>
      )
    } else if (!props.waitingOnEval && props.guessStatus === 3) {
      guessInput = (
        <Aux>
          <p>You were correct!</p>
        </Aux>
      )
    } else if (!props.waitingOnEval && props.cannotGuess) {
      guessInput = (
        <Aux>
          <p>You can't guess this one.</p>
        </Aux>
      );
    }

    guessInterface = (
      <Aux>
        <h1>{props.numGuesses} Guesses Left</h1>
        {guessInput}
      </Aux>
    );
  }

  const readyForNextButton = (!props.isOwner) ? (
    <Button className="ready-for-next-button" variant="contained" color="primary" disabled={readyForNextDisabled}
      onClick={props.setReadyForNext}>Ready for Next</Button>
  ) : null

  return (
    <div className="card bottom-card">
      {guessInterface}
      <br />
      {readyForNextButton}
    </div>
  );
}

export default guesser;

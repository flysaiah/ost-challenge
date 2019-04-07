/*
Hints.js
Widget for tracking hints given by current owner
*/

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Aux from '../../hoc/Aux/Aux';
import './Hints.css';

const hints = (props) => {

    const givenHints = props.hints && props.hints.length ? props.hints.map((hint) => {
        return (
            <li className="hint" key={hint}>{hint}</li>
        )
    }) : null;

    let renderedContent;
    if (props.isOwner) {
        renderedContent = (
            <Aux>
                <h1>Hints</h1>
                <br/>
                <div className="guess-input">
                    <TextField label="Write hint here" margin="normal" value={props.newHint} onChange={props.inputChangeHandler}/>
                </div>
                <Button className="provide-hint-button" variant="contained" color="primary" onClick={props.provideHint} disabled={!props.newHint}>Provide Hint</Button>
            </Aux>        )
    } else if (props.cannotGuess) {
        renderedContent = null;
    } else {
        renderedContent = (
            <Aux>
                <h1>Hints</h1>
                <ol>
                    {givenHints}
                </ol>
            </Aux>
        );
    }

    return (
        <div className="card bottom-card">
            {renderedContent}
        </div>
    )
}

export default hints;

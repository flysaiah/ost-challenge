import React, { Component } from 'react';
import logo from './logo.svg';
import ChallengeInterface from './containers/ChallengeInterface/ChallengeInterface';

import './App.css';

class App extends Component {
  render () {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 >My OST Challenge, Your Beats!</h1>
        </header>
        <ChallengeInterface />
      </div>
    );
  }
}

export default App;

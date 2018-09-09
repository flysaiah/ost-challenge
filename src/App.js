import React, { Component } from 'react';
import ChallengeInterface from './containers/ChallengeInterface/ChallengeInterface';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
        <Sidebar />
        <ChallengeInterface />
      </div>
    );
  }
}

export default App;

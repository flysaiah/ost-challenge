import React, { Component } from 'react';
import ChallengeInterface from './containers/ChallengeInterface/ChallengeInterface';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

class App extends Component {

  render () {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#00b0ff'
        }
      },
    });
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />

          <Sidebar />
          <ChallengeInterface />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

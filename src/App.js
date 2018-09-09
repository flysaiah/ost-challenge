import React, { Component } from 'react';
import ChallengeInterface from './containers/ChallengeInterface/ChallengeInterface';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Aux from './hoc/Aux/Aux';
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
      <Aux>
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Sidebar />
            <ChallengeInterface />
          </div>
        </MuiThemeProvider>
      </Aux>
    );
  }
}

export default App;

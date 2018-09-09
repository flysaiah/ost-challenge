import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ChallengeInterface from './containers/ChallengeInterface/ChallengeInterface';
import CreateGroup from './components/CreateGroup/CreateGroup';
import JoinGroup from './components/JoinGroup/JoinGroup';
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
          <BrowserRouter>
            <Aux>
              <Route path="/" exact component={ChallengeInterface} />
              <Route path="/createGroup" exact component={CreateGroup} />
              <Route path="/joinGroup" exact component={JoinGroup} />
            </Aux>
          </BrowserRouter>
        </MuiThemeProvider>
      </Aux>
    );
  }
}

export default App;

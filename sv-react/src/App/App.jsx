import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import { history } from '@/_helpers';
import {
  authenticationService,
  accountService
} from '@/_services';
import { PrivateRoute } from '@/_components';
import { RegisterPage, LoginPage, Profile, VerifyPage } from '@/Account';
import { HomePage } from '@/HomePage';
import { Match } from '@/Match';
import CreateRoom from './CreateRoom'
import SimpleMenu from './Menu'

import { deathEaterViolet } from '@/Styles'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      nickname: "",
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    accountService.userInfo()
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  goHome() {
    history.push('/');
  }

  profile() {
    history.push('/profile');
  }


  render() {
    const { currentUser } = this.state
    return (
      <Router history={history}>
        <div>
          {currentUser &&
            <AppBar position="relative">
              <Toolbar className="sv-toolBar" style={{ backgroundColor: deathEaterViolet }}>
                <img src="public/sv-logo.jpg" onClick={this.goHome} style={{ width: "80px" }} alt="logo" />
                <Typography variant="h6" color="inherit">
                  Secret Voldemort
                </Typography>
                <Grid container justify="flex-end">
                  < CreateRoom />
                  < SimpleMenu
                    home={this.goHome}
                    profile={this.profile}
                    logout={this.logout}
                  />
                </Grid>
              </Toolbar>
            </AppBar>
          }
          <div className="jumbotron">
            <div className="container" style={{"margin-left": "auto !important", "margin-right":"auto !important", "width": "100% !important", "max-width": "95%"}}>
              <PrivateRoute exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/match" component={Match} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/verify" component={VerifyPage} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
export { App };

import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { RegisterPage, LoginPage } from '@/Account';
import { HomePage } from '@/HomePage';
import { Match } from '@/Match';
import { lobbyService } from '../_services';
import CreateRoom from './CreateRoom'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            currentMail: ""
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
        this.setState({currentMail: authenticationService.userInfo().email})
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }
    
    goHome() {
      history.push('/');
    }

    render() {
        const { currentUser, currentMail } = this.state;
        return (
                <Router history={history}>
                    <div>
                        {currentUser &&
                          <AppBar position="relative">
                            <Toolbar className="sv-toolBar" style={{backgroundColor: "#5c4965"}}>
                              <img src="public/sv-logo.jpg" onClick={this.goHome} style={{width: "80px"}} alt="logo" />
                              <Typography variant="h6" color="inherit">
                                Secret Voldemort
                              </Typography> 
                              <Typography variant="h6" color="inherit">
                                {currentMail}
                              </Typography> 

                              <Grid container justify="flex-end">
                                < CreateRoom />
                                <Button color="inherit" onClick={this.logout}>
                                Cerrar Sesión
                              </Button>
                              </Grid>
                            </Toolbar>
                          </AppBar>
                        }
                        <div className="jumbotron">
                            <div className="container">
                                        <PrivateRoute exact path="/" component={HomePage} />
                                        <Route path="/login" component={LoginPage} />
                                        <Route path="/match" component={Match} />
                                        <Route path="/register" component={RegisterPage} />
                            </div>
                        </div>
                    </div>
                </Router>
        );
    }
}
export { App };

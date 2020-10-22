import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { AppBar } from '@material-ui/core';
import { HomePage } from '@/HomePage';
import { LoginPage } from '@/LoginPage';
import { Match } from '@/Match';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <header className="match-header">
                <AppBar position="relative">
                <Toolbar className="sv-toolBar">
                    
                    <Typography variant="h6" color="inherit" noWrap>
                    Secret Voldemort
                    </Typography>
                </Toolbar>
                </AppBar>
                <Router history={history}>
                    <div>
                        {currentUser &&
                            <nav className="navbar navbar-expand navbar-dark bg-dark">
                                <div className="navbar-nav">
                                    <Link to="/" className="nav-item nav-link">Inicio</Link>
                                    <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                                </div>
                            </nav>
                        }
                        <div className="jumbotron">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3">
                                        <PrivateRoute exact path="/" component={HomePage} />
                                        <Route path="/login" component={LoginPage} />
                                        <Route path="/match" component={Match} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Router>
            </header>
        );
    }
}
export { App }; 

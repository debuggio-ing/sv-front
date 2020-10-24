import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
//import { AppBar } from '@material-ui/core'; to be used later
import { RegisterPage, LoginPage } from '@/Account';
import { HomePage } from '@/HomePage';
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

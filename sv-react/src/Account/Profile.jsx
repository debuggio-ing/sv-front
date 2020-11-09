import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Details } from './Details';

function Profile({ match }) {
    const { path } = match;
    
    return (
        <div className="p-4">
            <div className="container">
                <Switch>
                    <Route exact path={path} component={Details}/>
                </Switch>
            </div>
        </div>
    );
}

export { Profile };
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AscendersUserLogin from '../components/AscendersUserLogin.js/index.js';
import AscendersUserHome from '../components/AscendersUserHome.js/index.js';
import NotFoundPage from '../components/NotFoundPage.js';

import {AppContext} from '../components/AppContext.js';

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "undefined",
            role: "undefined",
            token: "undefined",
            isAuthenticated: true
        };
    }

    render() {
        return (
            <AppContext.Provider
                value={this.state}>
                <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={AscendersUserLogin}/>
                        <Route path="/user" component={AscendersUserHome}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
                </BrowserRouter>
            </AppContext.Provider>
        );
    }
};

export default AppRouter;
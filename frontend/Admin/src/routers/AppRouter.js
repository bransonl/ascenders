import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AscendersAdminLogin from '../components/AscendersAdminLogin.js';
import AscendersAdminHome from '../components/AscendersAdminHome.js';
import NotFoundPage from '../components/NotFoundPage.js';

import {AppContext} from '../components/globalContext/AppContext.js';

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
                        <Route exact path="/" component={AscendersAdminLogin}/>
                        <Route path="/admin" component={AscendersAdminHome}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
                </BrowserRouter>
            </AppContext.Provider>
        );
    }
};

export default AppRouter;
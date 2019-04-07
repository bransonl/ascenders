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
            username: "branson_admin",
            role: "admin",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvYmplY3RJZCI6Ildaa0VuUDh2RW0iLCJ1c2VybmFtZSI6ImJyYW5zb25fYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJwaG9uZSI6IjQxNS0zOTItMDIwMiIsImdvZ28iOiJsYWxhMiIsImNyZWF0ZWRBdCI6IjIwMTktMDItMjZUMTY6NDc6MjYuMjgyWiIsInVwZGF0ZWRBdCI6IjIwMTktMDItMjZUMTY6NDc6MjYuMjgyWiIsIkFDTCI6eyIqIjp7InJlYWQiOnRydWV9LCJXWmtFblA4dkVtIjp7InJlYWQiOnRydWUsIndyaXRlIjp0cnVlfX0sInNlc3Npb25Ub2tlbiI6InI6Mjg4YjIyOGU3MDZjY2U2MTNhOGZmODkyODNhMTllMzYiLCJpYXQiOjE1NTQ1Nzg2MDB9.B-Xz1nztx4fo7lg9HAZ8gPpqz7NYGKpMtJkTeHFT6ws",
            isAuthenticated: true,

            logout: this.logout
        };
        this.logout = this.logout.bind(this);

    }

    logout() {
        this.setState({
            isAuthenticated: false,
            username: undefined,
            role: undefined,
            token: undefined
        })
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
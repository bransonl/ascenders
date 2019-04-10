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
            username: "andrehadianto",
            role: "admin",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvYmplY3RJZCI6IlpxNXV3TVFONDIiLCJ1c2VybmFtZSI6ImFuZHJlaGFkaWFudG8iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDE5LTA0LTA5VDE1OjU5OjAyLjg0N1oiLCJ1cGRhdGVkQXQiOiIyMDE5LTA0LTA5VDE1OjU5OjAyLjg0N1oiLCJBQ0wiOnsiKiI6eyJyZWFkIjp0cnVlfSwiWnE1dXdNUU40MiI6eyJyZWFkIjp0cnVlLCJ3cml0ZSI6dHJ1ZX19LCJzZXNzaW9uVG9rZW4iOiJyOmNmYmJmZWIyMjMzMGZiN2Q1MmNlOTQyMzM0ZDVmYjcyIiwiaWF0IjoxNTU0ODg3ODkxfQ.YFaWk1_gdvUU7wZRFlHKogw4ZWm9Jp0GaU4wRJkJAYQ",
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
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AscendersUserLogin from '../components/AscendersUserLogin.js';
import AscendersUserHome from '../components/AscendersUserHome.js';
import NotFoundPage from '../components/NotFoundPage.js';
import axios from 'axios';

import {AppContext} from '../components/globalContext/AppContext.js';

class AppRouter extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            username: sessionStorage.getItem("username"),
            role: sessionStorage.getItem("role"),
            token: sessionStorage.getItem("token"),
            logout: this.logout
        };
    }

    logout() {
        console.log("\nContext logout is called...");
        console.log(this.state);
        // const token = 'Bearer ' + this.context.token
        const token = 'Bearer ' + sessionStorage.getItem("token");
        fetch(`http://${this.context.apiUri}/logout`, {
            method: 'POST',
            headers: {
                'Authorization': token,
            },
        })
        .then(res => {
            console.log(res)
            this.setState({
                username: undefined,
                role: undefined,
                token: undefined,
            });
            console.log("\n Logging out...");
        })
        .catch(err => console.log(err));
        sessionStorage.clear();
        delete this.context.username;
        delete this.context.role;
        delete this.context.token;
        this.forceUpdate();
    }

    render() {
        return (
            <AppContext.Provider
                value={this.state}>
                <BrowserRouter basename="/user">
                <div>
                    <Switch>
                        <Route exact path="/login" component={AscendersUserLogin}/>
                        <Route path="/" component={AscendersUserHome}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
                </BrowserRouter>
            </AppContext.Provider>
        );
    }
};

export default AppRouter;

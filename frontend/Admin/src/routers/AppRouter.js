import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AscendersAdminLogin from '../components/AscendersAdminLogin.js';
import AscendersAdminHome from '../components/AscendersAdminHome.js';
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
            logout: this.logout,
            apiUri: process.env.API_URI,
        };
    }

    logout() {
        console.log("\nContext logout is called...");
        console.log(this.state);
        // const token = 'Bearer ' + this.context.token
        // const token = 'Bearer ' + sessionStorage.getItem("token");
        // const url = "http://${this.context.apiUri}/logout"
        // axios.post(url,
        //     null, {
        //     headers: {
        //         Authorization: token
        //     }
        // })
        // .then(res => {
        //     console.log(res)
        //     this.setState({
        //         username: undefined,
        //         role: undefined,
        //         token: undefined,
        //     });
        // });
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
                <BrowserRouter basename="/admin">
                <div>
                    <Switch>
                        <Route exact path="/login" component={AscendersAdminLogin}/>
                        <Route path="/" component={AscendersAdminHome}/>
                        <Route component={NotFoundPage}/>
                    </Switch>
                </div>
                </BrowserRouter>
            </AppContext.Provider>
        );
    }
};

export default AppRouter;

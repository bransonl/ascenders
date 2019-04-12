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
            username: undefined,
            role: undefined,
            token: undefined,
            isAuthenticated: true,
            redirectToHome: false,
            logout: this.logout()
        };
    }

    logout() {
        console.log("\nContext logout is called...");
        console.log(this.state);
        
        // const url = "http://127.0.0.1:3000/logout"
        // axios.post(url, 
        //     null, {
        //     headers: {
        //         Authorization: "Bearer " + this.state.token
        //     }
        // })
        // .then(res => {
        //     console.log(res)
        //     this.setState({
        //         username: undefined,
        //         role: undefined,
        //         token: undefined,
        //         isAuthenticated: false
        //     });
        // });
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
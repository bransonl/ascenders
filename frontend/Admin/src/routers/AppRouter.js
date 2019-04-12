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
            username: "andrehadianto",
            role: "admin",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvYmplY3RJZCI6IlpxNXV3TVFONDIiLCJ1c2VybmFtZSI6ImFuZHJlaGFkaWFudG8iLCJyb2xlIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDE5LTA0LTA5VDE1OjU5OjAyLjg0N1oiLCJ1cGRhdGVkQXQiOiIyMDE5LTA0LTA5VDE1OjU5OjAyLjg0N1oiLCJBQ0wiOnsiKiI6eyJyZWFkIjp0cnVlfSwiWnE1dXdNUU40MiI6eyJyZWFkIjp0cnVlLCJ3cml0ZSI6dHJ1ZX19LCJzZXNzaW9uVG9rZW4iOiJyOmIxZDRlZGJmMDJmYjY5Y2I1ODU1NzlmODM2NDBjMTY1IiwiaWF0IjoxNTU1MDU0NTkwfQ.zMaTGXsxIdKZTTS8YUpZBTvSi3tDGeDeQrDvI1bZO0I",
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
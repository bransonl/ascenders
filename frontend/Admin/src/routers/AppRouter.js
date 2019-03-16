import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage.js';
import AscendersAdminLogin from '../components/AscendersAdminLogin.js';


const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={AscendersAdminLogin} exact={true}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
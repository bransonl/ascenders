import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import AscendersAdminLogin from '../components/AscendersAdminLogin.js';
import AscendersAdminHome from '../components/AscendersAdminHome.js';
import NotFoundPage from '../components/NotFoundPage.js';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={AscendersAdminLogin} exact={true}/>
                <Route path="/admin" component={AscendersAdminHome}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
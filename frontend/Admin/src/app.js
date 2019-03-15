import React from 'react';
import ReactDOM from 'react-dom';
import AscendersAdminLogin from './components/AscendersAdminLogin.js';

import {BrowserRouter, Route} from 'react-router-dom';

const AdminLoginPage = () => {

}

const routes = (
    <BrowserRouter>
        <Route path="/" component={<AscendersAdminLogin/>} exact={true}/>
    </BrowserRouter>
);
ReactDOM.render(<AscendersAdminLogin/> ,document.getElementById('app'));
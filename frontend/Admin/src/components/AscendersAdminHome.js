import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import Sidebar from './Sidebar.js';
import Dashboard from './Dashboard.js';


export default class AscendersAdminHome extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar/>
                        <div className="base-row">
                            <Sidebar/>
                            <div className="main-app">
                                <Switch>
                                    <Route path="/admin/dashboard" component={Dashboard}/>
                                    <Route path="/admin/tickets" component={Dashboard}/>
                                    <Route path="/admin/messages" component={Dashboard}/>
                                    <Route path="/admin/addticket" component={Dashboard}/>
                                </Switch>
                            </div>
                        </div>
                </div>
            </BrowserRouter>
        );
    }
}


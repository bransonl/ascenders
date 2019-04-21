import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import Sidebar from './Sidebar.js';
import Dashboard from './Dashboard.js';
import Ticket from './Ticket.js';
import reactAdmin from './Tickets-user.js/index.js';
import AddTicket from './AddTicket.js';
import Messages from './Messages.js';

export default class AscendersUserHome extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar/>
                        <div className="base-row">
                            <Sidebar/>
                            <Switch>
                                <Route path="/user/dashboard" component={Dashboard}/>
                                <Route path="/user/tickets" component={reactAdmin}/>
                                <Route path="/user/messages" component={Messages}/>
                                <Route path="/user/addticket" component={AddTicket}/>
                            </Switch>
                        </div>
                </div>
            </BrowserRouter>
        );
    }
}


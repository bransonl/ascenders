import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import Sidebar from './Sidebar.js';
import Dashboard from './Dashboard.js';
import Ticket from './Ticket.js';
import AddTicket from './AddTicket.js';
import Messages from './Messages.js';

export default class AscendersAdminHome extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar/>
                        <div className="base-row">
                            <Sidebar/>
                            <Switch>
                                <Route path="/admin/dashboard" component={Dashboard}/>
                                <Route path="/admin/tickets" component={Ticket}/>
                                <Route path="/admin/messages" component={Messages}/>
                                <Route path="/admin/addticket" component={AddTicket}/>
                            </Switch>
                        </div>
                </div>
            </BrowserRouter>
        );
    }
}


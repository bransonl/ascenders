import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import Sidebar from './Sidebar.js';
import Dashboard from './Dashboard.js';
import Ticket from './Ticket.js';
import TicketPreview from './TicketPreview';
import Messages from './Messages.js';
import NotFoundPage from './NotFoundPage';
import '../css/reusable.css';
import '../css/AscendersAdminHome.css';

export default class AscendersAdminHome extends React.Component {
    render() {
        return (
            <BrowserRouter basename="/admin">
                <div>
                    <NavigationBar/>
                        <div className="base-row">
                            <Sidebar/>
                            <Switch>
                                <Route exact path="/" component={Dashboard}/>
                                <Route path="/dashboard" component={Dashboard}/>
                                <Route exact path="/tickets" component={Ticket}/>
                                <Route path="/messages" component={Messages}/>
                                <Route exact path="/tickets/preview/:ticketId" component={TicketPreview}/>
                                <Route component={NotFoundPage}/>

                            </Switch>
                        </div>
                </div>
            </BrowserRouter>
        );
    }
}


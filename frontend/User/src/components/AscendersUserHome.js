import React from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import Sidebar from './Sidebar.js';
import Dashboard from './Dashboard.js';
import Ticket from './Ticket.js';
import TicketPreview from './TicketPreview.js';
import Archive from './Archive.js';
import ArchiveTicketPreview from './ArchiveTicketPreview.js';
import NotFoundPage from './NotFoundPage.js';
import '../css/reusable.css';
import '../css/AscendersAdminHome.css';
import {AppContext} from './globalContext/AppContext.js';

class AscendersUserHome extends React.Component {
    render() {
        if (!sessionStorage.getItem("token")) {
            console.log("Not authenticated...");
            return (<Redirect to="/login"/>);
        } else {
            console.log("Authentication: ", !!sessionStorage.getItem("token"));
            return (
                <div>
                    <NavigationBar/>
                        <div className="base-row">
                            <Sidebar/>
                            <Switch>
                                <Route exact path="/" component={Dashboard}/>
                                <Route exact path="/tickets" component={Ticket}/>
                                <Route exact path="/archive" component={Archive}/>
                                <Route exact path="/tickets/preview/:ticketId" component={TicketPreview}/>
                                <Route exact path="/archive/preview/:ticketId" component={ArchiveTicketPreview}/>
                                <Route component={NotFoundPage}/>
                            </Switch>
                        </div>
                </div>
            );
        }
    }
}

AscendersUserHome.contextType = AppContext
export default AscendersUserHome;

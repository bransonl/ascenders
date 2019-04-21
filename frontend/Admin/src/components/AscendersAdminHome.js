import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavigationBar from './NavigationBar.js';
import Sidebar from './Sidebar.js';
import Dashboard from './Dashboard.js';
import Ticket from './Ticket.js';
import TicketPreview from './TicketPreview';
import Archives from './Archives.js';
import ArchivesPreview from './ArchivesPreview';
import NotFoundPage from './NotFoundPage';
import '../css/reusable.css';
import '../css/AscendersAdminHome.css';
import { AppContext } from './globalContext/AppContext.js';

class AscendersAdminHome extends React.Component {
    render() {
        if (sessionStorage.getItem("isAuthenticated") !== "true") {
            console.log("Not authenticated...");
            return (<Redirect to="/login"/>);
        } else {
            console.log("Authentication: ", sessionStorage.getItem("isAuthenticated"));
            return (
                <div>
                    <NavigationBar/>
                        <div className="base-row">
                            <Sidebar/>
                            <Switch>
                                <Route exact path="/" component={Dashboard}/>
                                <Route exact path="/tickets" component={Ticket}/>
                                <Route exact path="/archive" component={Archives}/>
                                <Route exact path="/tickets/preview/:ticketId" component={TicketPreview}/>
                                <Route exact path="/archive/preview/:ticketId" component={ArchivesPreview}/>
                                <Route component={NotFoundPage}/>
                            </Switch>
                        </div>
                </div>
            );
        }
    }
}

AscendersAdminHome.contextType = AppContext
export default AscendersAdminHome;

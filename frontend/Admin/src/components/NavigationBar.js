import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import logo from './resources/accenture-purple-logo.png'
import IosNotifications from 'react-ionicons/lib/IosNotifications'
import IosListBox from 'react-ionicons/lib/IosListBox'
import IosContact from 'react-ionicons/lib/IosContact'

import '../css/reusable.css';
import '../css/NavigationBar.css';
import { AppContext } from './globalContext/AppContext';

const AccountPop = (props) => {
    return (
        <Popover title="My Account">
            <Button onClick={props.logout}>Sign Out</Button>
        </Popover>
    );
}

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {};
    }

    logout() {
        console.log("\nLogging out...");
        console.log("Current context: ", this.context);
        this.context.logout();
    }

    render() {
        return (
                <div>
                    <Nav
                        onSelect={selectedKey => console.log(`${selectedKey} is clicked`)}>
                        <div className="nav-wrapper">
                            <Nav.Item bsPrefix="logo">
                                <NavLink to="/dashboard">
                                    <img className="nav-logo"src={logo} alt="logo"/>
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item className="right">
                                <a className="nav-link"><IosNotifications className="nav-icons"/></a>
                                <a className="nav-link"><IosListBox className="nav-icons"/></a>

                                <OverlayTrigger
                                    trigger="click"
                                    placement="bottom"
                                    rootClose={true}
                                    overlay= {<AccountPop logout={this.logout}/>}
                                >
                                    <a className="nav-link"><IosContact className="nav-icons"/></a>
                                </OverlayTrigger>

                            </Nav.Item>
                        </div>

                    </Nav>
                </div>
        );
    }
}

NavigationBar.contextType = AppContext;
export default NavigationBar;

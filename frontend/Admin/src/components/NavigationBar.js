import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Nav, OverlayTrigger, Popover, Navbar } from 'react-bootstrap';
import logo from './resources/accenture-purple-logo.png'
import IosNotifications from 'react-ionicons/lib/IosNotifications'
import IosListBox from 'react-ionicons/lib/IosListBox'
import IosContact from 'react-ionicons/lib/IosContact'

import '../css/reusable.css';
import '../css/NavigationBar.css';
import { AppContext } from './globalContext/AppContext';

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
            <Navbar className="nav">
                <Navbar.Brand>
                    <NavLink to="/">
                        <img className="nav-logo" src={logo} alt="logo"/>
                    </NavLink>
                </Navbar.Brand>
                <Nav
                    className="justify-content-end w-100"
                    onSelect={selectedKey => console.log(`${selectedKey} is clicked`)}
                >
                    <Nav.Item>
                        <a className="nav-link"><IosNotifications className="nav-icons"/></a>
                    </Nav.Item>
                    <Nav.Item>
                        <a className="nav-link"><IosListBox className="nav-icons"/></a>
                    </Nav.Item>
                    <Nav.Item>
                        <OverlayTrigger
                            trigger="click"
                            rootClose={true}
                            placement="bottom"
                            overlay={
                                <Popover id="my-account-popover" title="My Account">
                                    <Button onClick={this.props.logout}>Sign Out</Button>
                                </Popover>
                            }
                        >
                            <a className="nav-link"><IosContact className="nav-icons"/></a>
                        </OverlayTrigger>
                    </Nav.Item>
                </Nav>
            </Navbar>
        )
    }
}

NavigationBar.contextType = AppContext;
export default NavigationBar;

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
import logo from './resources/accenture-purple-logo.png'
import IosNotifications from 'react-ionicons/lib/IosNotifications'
import IosListBox from 'react-ionicons/lib/IosListBox'
import IosContact from 'react-ionicons/lib/IosContact'

import '../css/reusable.css';
import '../css/NavigationBar.css';
import { AppContext } from './globalContext/AppContext';

const accountPop = (
    <Popover
        placement="bottom"
    >
        <Button>Sign Out</Button>
    </Popover>
);

class NavigationBar extends React.Component {
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
                            <Link to='/notification' className="nav-link"><IosNotifications className="nav-icons"/></Link>
                            <Link to='/todo' className="nav-link"><IosListBox className="nav-icons"/></Link>
                            
                            <OverlayTrigger
                                trigger="click"
                                placement="auto"
                                rootClose="true"
                                overlay= {accountPop}
                            >
                                <Link to='/' className="nav-link"><IosContact className="nav-icons"/></Link>
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
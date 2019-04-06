import React from 'react';
import {BrowserRouter, NavLink, Link} from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import logo from './resources/accenture-purple-logo.png'
import IosNotifications from 'react-ionicons/lib/IosNotifications'
import IosListBox from 'react-ionicons/lib/IosListBox'
import IosContact from 'react-ionicons/lib/IosContact'

import '../css/reusable.css';
import '../css/NavigationBar.css';

export default class NavigationBar extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Nav 
                        onSelect={selectedKey => console.log(`${selectedKey} is clicked`)}>
                        <div className="nav-wrapper">
                        <Nav.Item bsPrefix="logo">
                            <NavLink to="/admin">
                                <img className="nav-logo"src={logo} alt="logo"/>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item className="right">
                            <Link to='/admin/notification' className="nav-link"><IosNotifications className="nav-icons"/></Link>
                            <Link to='/admin/todo' className="nav-link"><IosListBox className="nav-icons"/></Link>
                            <Link to='/admin/myaccount' className="nav-link"><IosContact className="nav-icons"/></Link>
                        </Nav.Item>
                        </div>

                    </Nav>
                </div>
            </BrowserRouter>
        );
    }
}
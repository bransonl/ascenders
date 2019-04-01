import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import logo from './resources/accenture-purple-logo.png'
import IosNotifications from 'react-ionicons/lib/IosNotifications'
import IosListBoxOutline from 'react-ionicons/lib/IosListBoxOutline'
import IosContactOutline from 'react-ionicons/lib/IosContactOutline'

export default class NavigationBar extends React.Component {
    render() {
        let links = [
            {label: 'Notification', icon: <IosNotifications className="IosNotifications" color="#febc11"/>, link: '/admin/notification'},
            {label: 'To-do', icon: <IosListBoxOutline className="IosListBoxOutline" color="#febc11"/>,link: '/admin/todo'},
            {label: 'MyAccount', icon: <IosContactOutline className="IosContactOutline" color="#febc11"/>,link: '/admin/myaccount'},
        ];
        return (
            <BrowserRouter>
                <div>
                    <nav className="nav">
                        <div className="nav-wrapper">
                            <Link exact to="/"><img className="nav-logo" src={logo} alt="logo"/></Link>
                            <ul className="nav-link right">
                            {links.map((link,index) => {
                                return (
                                    <li key={index} className="nav-link-list">
                                        {<Link to={link.link}>{link.icon}</Link>}
                                    </li>
                                );
                            })}
                            </ul>
                        </div>
                    </nav>               
                </div>
            </BrowserRouter>
        );
    }
}
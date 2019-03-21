import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import logo from './resources/accenture-purple-logo.png'

export default class NavigationBar extends React.Component {
    render() {
        let links = [
            {label: 'Notification', link: '/admin/notification'},
            {label: 'To-do', link: '/admin/todo'},
            {label: 'MyAccount', link: '/admin/myaccount'},
        ];
        return (
            <div>
                <nav className="nav">
                    <div className="nav-wrapper">
                        <Link exact={true} to="/"><img className="nav-logo" src={logo} alt="logo"/></Link>
                        <ul className="nav-link right">
                        {links.map((link,index) => {
                            return (
                                <li key={index} className="nav-link-list">
                                    {<Link to={link.link}>{link.label}</Link>}
                                </li>
                            );
                        })}
                        </ul>
                    </div>
                </nav>               
            </div>
        );
    }
}
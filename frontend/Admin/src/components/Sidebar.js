import React from 'react';
import {NavLink} from 'react-router-dom';

export default class Sidebar extends React.Component {
    render() {
        let links = [
            {label: 'Dashboard', link: '/admin/dashboard'},
            {label: 'Tickets', link: '/admin/tickets'},
            {label: 'Messages', link: '/admin/messages'},
            {label: 'Add Ticket', link: '/admin/addticket'}
        ];

        return (
                <div className="sidebar">
                    <div className="sidebar-nav-container">
                        <ul className="sidebar-nav-link">
                            {links.map((link,index) => {
                                return (
                                    <li key={index} className="sidebar-nav-link-list">
                                        {<NavLink to={link.link} activeClassName={link.class}>{link.label}</NavLink>}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
        );
    }
}
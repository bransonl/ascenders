import React from 'react';
import {NavLink} from 'react-router-dom';
import IosApps from 'react-ionicons/lib/IosApps';
import IosPaper from 'react-ionicons/lib/IosPaper';
import IosText from 'react-ionicons/lib/IosText';
import IosAdd from 'react-ionicons/lib/IosAdd';


export default class Sidebar extends React.Component {
    render() {
        let links = [
            {label: 'Dashboard', icon: <IosApps className="sidebar-icon"/>, link: '/admin/dashboard'},
            {label: 'Tickets', icon: <IosPaper className="sidebar-icon" />, link: '/admin/tickets'},
            {label: 'Messages', icon: <IosText className="sidebar-icon" />, link: '/admin/messages'},
            {label: 'Add Ticket', icon: <IosAdd className="sidebar-icon" />, link: '/admin/addticket'}
        ];

        return (
                <div className="sidebar">
                    <div className="sidebar-nav-container">
                        <ul className="sidebar-nav-link">
                            {links.map((link,index) => {
                                return (
                                    <li key={index} className="sidebar-nav-link-list">
                                        {<NavLink to={link.link} activeClassName={link.class}>{link.icon}{link.label}</NavLink>}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
        );
    }
}
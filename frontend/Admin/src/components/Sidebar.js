import React from 'react';
import { NavLink } from 'react-router-dom';
import IosApps from 'react-ionicons/lib/IosApps';
import IosPaper from 'react-ionicons/lib/IosPaper';
import IosArchive from 'react-ionicons/lib/IosArchive';
import IosPerson from 'react-ionicons/lib/IosPerson';

import '../css/reusable.css';
import '../css/Sidebar.css';


export default class Sidebar extends React.Component {
    render() {
        let links = [
            {label: 'Dashboard', icon: <IosApps className="sidebar-icon"/>, link: '/'},
            {label: 'Tickets', icon: <IosPaper className="sidebar-icon" />, link: '/tickets'},
            {label: 'Archive', icon: <IosArchive className="sidebar-icon" />, link: '/archive'},
            {label: 'User', icon: <IosPerson className="sidebar-icon" />, link: '/users'},
        ];

        return (
                <div className="sidebar">
                    <div className="sidebar-nav-container">
                        <ul className="sidebar-nav-link">
                            {links.map((link,index) => {
                                return (
                                    <li key={index} className="sidebar-nav-link-list">
                                        <NavLink to={link.link} activeClassName={link.class}>{link.icon}{link.label}</NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
        );
    }
}

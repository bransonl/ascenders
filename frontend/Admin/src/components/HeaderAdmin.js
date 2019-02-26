import React from 'react';

export default class HeaderAdmin extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <nav className="pinned z-depth-5 beta-nav">
                    <div className="nav-wrapper row">
                        <a className="brand-logo">ascenders</a>
                        <ul className="right">
                            <li><a className="nav-link-admin" id="messages">Messages</a></li>
                            <li><a className="nav-link-admin" id="tickets">Tickets</a></li>
                            <li><a className="nav-link-admin" id="dashboard">Dashboard</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
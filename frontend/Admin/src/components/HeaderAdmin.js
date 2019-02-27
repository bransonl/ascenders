import React from 'react';

export default class HeaderAdmin extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const logo = 'ascenders';
        const tabs = {
            messages: "messages",
            tickets: "tickets",
            dashboard: "dashboard"
        }
        return (
            <div>
                <nav className="admin-nav">
                    <div className="nav-wrapper-admin">
                        <a className="brand-logo">{logo}</a>
                        <ul className="right">
                            <li><a className="nav-link-admin" id="messages">{tabs.messages}</a></li>
                            <li><a className="nav-link-admin" id="tickets">{tabs.tickets}</a></li>
                            <li><a className="nav-link-admin" id="dashboard">{tabs.dashboard}</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
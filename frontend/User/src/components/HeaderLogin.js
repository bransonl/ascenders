import React from 'react';

export default class HeaderLogin extends React.Component{
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
                            <li><a className="nav-link">Login</a></li>
                            <li><a className="nav-link">Settings</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
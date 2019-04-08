import React from 'react';
import logo from './resources/accenture-purple-logo.png';

import '../css/reusable.css';
import '../css/Dashboard.css';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="main-app">

                <div className="container-login-tmp">
                    <div className="container-splash-tmp">
                        <div className="login-splash-1">
                            <img className="login-splash-logo" src={logo}/>
                            <div className="login-splash-text">
                                <label className="login-splash-text-h3">Welcome aboard</label>
                                <p>Sit down, relax, and let the work goes away.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="row">
                    <div className="dash-tickets col span-2-of-4">
                        test
                    </div>
                    <div className="dash-messages col span-1-of-4">
                        test
                    </div>
                    <div className="dash-messages col span-1-of-4">
                        test
                    </div>
                </div> */}
            </div>
        );
    }
}
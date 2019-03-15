import React from 'react';

import logo from './resources/accenture-purple-logo.png';
import IosMail from 'react-ionicons/lib/IosMail';
import IosLock from 'react-ionicons/lib/IosLock';

export default class AdminLogin extends React.Component {
    render() {
        return (
            <div className="adminLogin">
                <div className="container-login">
                    <div className="container-splash">
                        <div className="login-splash-1">
                            <img className="login-splash-logo" src={logo} alt="accenture-purple-logo"></img>
                            <div className="login-splash-text">
                                <h3>ASCENDERS</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec neque tortor. Proin efficitur leo vel ex aliquarn.</p>
                            </div>
                        </div> 
                        <div className="login-splash-2">
                        
                        </div> 
                    </div>
                    <form className="container-form" onSubmit={this.login}>
                        <label className="container-form-title">Welcome to Ascenders</label>
                        <div className="container-form-wrap-input">
                            <IosMail className="IosMail"/>
                            <input className="input" type="text" name="username" placeholder="Username" required/>
                        </div>
                        <div className="container-form-wrap-input">
                            <IosLock className="IosLock"/>
                            <input className="input" type="password" name="password" placeholder="Password" required></input>
                        </div>
                        <div className="container-form-wrap-input-button">                   
                            <button className="input-button" type="submit">Login</button>
                        </div>
                        <label className="container-form-label">Forgot your password? <span className="forgot-password">Click Here</span></label>
                    </form>               
                </div>
            </div>
        );
    }
}
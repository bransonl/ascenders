import React from 'react';

import logo from './resources/accenture-purple-logo.png';
import IosMail from 'react-ionicons/lib/IosMail';
import IosLock from 'react-ionicons/lib/IosLock';

export default class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
    }
    login(e) {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        console.log(username, password); //to be removed
        fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        }).then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));  
        e.target.elements.username.value = "";
        e.target.elements.password.value = "";
    }

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
                            <IosMail className="IosMail" color="#e2e2e2"/>
                            <input className="input" type="text" name="username" placeholder="Username" required/>
                        </div>
                        <div className="container-form-wrap-input">
                            <IosLock className="IosLock" color="#e2e2e2"/>
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
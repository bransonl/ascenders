import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import logo from './resources/accenture-purple-logo.png'; //change?
import IosMail from 'react-ionicons/lib/IosMail';
import IosLock from 'react-ionicons/lib/IosLock';
import {AppContext} from './AppContext.js';

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            redirectToHome: false,
        };
    }

    login(e) {
        e.preventDefault();
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        console.log(this.state);
        fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
        .then(res => res.json())
        .then(res => {
            console.log("Response: ", res);
            // console.log("Login state: ", this.state);
            if (res.token !== undefined) {
                this.context.isAuthenticated = true;
                this.context.token = res.token;
                this.context.username = res.username;
                this.context.role = res.role;
                console.log("Context state: ", this.context);
                console.log("Authentication success...");

                this.setState({redirectToHome: true});
            } else {
                alert("Incorrect username/password!");
            }
        })
        .catch(err => console.log(err));  
    }

    render() {
        if (this.state.redirectToHome === true) {
            this.state.redirectToHome = false;
            return (<Redirect to={'/admin'}/>);
        } else {
        return (
            <div className="adminLogin">
                <div className="container-login">
                    <div className="container-splash">
                        <div className="login-splash-1">
                            <img className="login-splash-logo" src={logo} alt="accenture-purple-logo"/>
                            <div className="login-splash-text">
                                <label className="login-splash-text-h3">Ascenders</label>
                                <p>Login with the given user ID and password.</p>
                            </div>
                        </div> 
                        <div className="login-splash-2">
                        
                        </div> 
                    </div>
                    <form className="container-form" onSubmit={this.login}>
                        <label className="container-form-title">Welcome to Ascenders</label>
                        <div className="container-form-wrap-input">
                            <IosMail className="IosMail" color="#e2e2e2"/>
                            <input 
                            className="input" 
                            type="text" 
                            name="username" 
                            placeholder="Enter username"
                            required/>
                        </div>
                        <div className="container-form-wrap-input">
                            <IosLock className="IosLock" color="#e2e2e2"/>
                            <input 
                            className="input" 
                            type="password" 
                            name="password" 
                            placeholder="Enter password"
                            required/>
                        </div>
                        <div className="container-form-wrap-input-button">                   
                            <button className="input-button" type="submit">Login</button>
                        </div>
                        <label className="container-form-label">Forgot your password? <Link to="/"><span className="forgot-password">Click Here</span></Link></label>
                    </form>               
                </div>
            </div>
        );}
    }
};

AdminLogin.contextType = AppContext;
export default AdminLogin;
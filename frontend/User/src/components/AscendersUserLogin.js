import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import logo from './resources/accenture-purple-logo.png';
import IosMail from 'react-ionicons/lib/IosMail';
import IosLock from 'react-ionicons/lib/IosLock';
import { Form, Button } from 'react-bootstrap';

import '../css/reusable.css';
import '../css/AscendersUserLogin.css';

import {AppContext} from './globalContext/AppContext.js';

class AscendersUserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login(e) {
        console.log("\nAttempting to login...");
        e.preventDefault();
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        if (username !== null && password !== null) {
            console.log("Fetching from API...");
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
                if (res.token !== undefined) {

                    this.context.isAuthenticated = true;
                    this.context.token = res.token;
                    this.context.username = res.username;
                    this.context.role = res.role;

                    sessionStorage.setItem("isAuthenticated", true);
                    sessionStorage.setItem("token", res.token);
                    sessionStorage.setItem("username", res.username);
                    sessionStorage.setItem("role", res.role);

                    console.log("Context state: ", this.context);
                    console.log("Authentication success...");
                    this.props.history.push("/");
                } else {
                    alert("Incorrect username/password!");
                }
            })
            .catch(err => console.log(err));
        } else {
            alert("Please enter username/password...");
        }

    }

    render() {
        console.log("\nRendering login page...");
        if (sessionStorage.getItem("isAuthenticated") === "true") {
            console.log("Authenticated...");
            return (<Redirect to="/"/>);
        } else {
            return (
                <div className="userLogin">
                    <div className="container-login">
                        <div className="container-splash">
                            <div className="login-splash-1">
                                <img className="login-splash-logo" src={logo} alt="accenture-purple-logo"/>
                                <div className="login-splash-text">
                                    <label className="login-splash-text-h3">Ascenders</label>
                                    <p>Improve your performance and productivity with seamless and efficient working experience.</p>
                                </div>
                            </div>
                            <div className="login-splash-2">

                            </div>
                        </div>

                        <Form className="container-form" onSubmit={this.login}>
                            <Form.Group>
                                <Form.Label bsPrefix="login-form-label">Welcome to Ascenders</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <div className="container-form-wrap-input">
                                <IosMail className="IosMail" color="#e2e2e2"/>
                                <Form.Control
                                    bsPrefix="login-form-control"
                                    type="text"
                                    name="username"
                                    placeholder="Enter username"
                                    autoFocus= {true}

                                    required />
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div className="container-form-wrap-input">
                                <IosLock className="IosLock" color="#e2e2e2"/>
                                <Form.Control
                                    bsPrefix="login-form-control"
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    autoComplete= "on"
                                    required />
                                </div>
                            </Form.Group>
                            <div className="container-form-wrap-input-button">
                                <Button bsPrefix="login-btn" type="submit">Login</Button>
                            </div>
                            <label className="container-form-label">Forgot your password? <Link to="/"><span className="forgot-password">Click Here</span></Link></label>
                        </Form>
                    </div>
                </div>
            );
        }
    }
};

AscendersUserLogin.contextType = AppContext;
export default AscendersUserLogin;

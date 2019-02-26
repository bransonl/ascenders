import React from 'react';

export default class LoginPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="container-login">
                <form className="container-form">
                    <label className="container-form-title">Welcome to Ascenders</label>
                    <div className="wrap-input">
                        <input className="input" type="email" name="email" placeholder="Email" required></input>
                    </div>
                    <div className="wrap-input">
                        <input className="input" type="password" name="password" placeholder="Password" required></input>
                    </div>
                     <div className="wrap-input">                   
                        <button className="input-button" type="submit">Login</button>
                    </div>
                </form>               
            </div>
        )
    }
}
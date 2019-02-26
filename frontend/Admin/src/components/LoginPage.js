import React from 'react';

export default class LoginPage extends React.Component{
    constructor(props){
        super(props);
    }

    login(e) {
        e.preventDefault();

        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        console.log(username, password);
        fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        }).then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render(){
        return(
            <div className="container-login">
                <form className="container-form" onSubmit={this.login}>
                    <label className="container-form-title">Welcome to Ascenders</label>
                    <div className="wrap-input">
                        <input className="input" type="text" name="username" placeholder="Username" required></input>
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
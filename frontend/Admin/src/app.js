import React from 'react';
import ReactDOM from 'react-dom';

class AscendersApp extends React.Component{
    render(){
        return (
            <div>
                <HeaderNav/>
                <HeaderBanner/>
            </div>
        );
    }
}

class HeaderNav extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <nav className="pinned z-depth-5 beta-nav">
                    <div className="nav-wrapper row">
                        <a className="brand-logo">LOGO</a>
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

class HeaderBanner extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <section className="heroimage">
                    <div className="bg-overlay">
                      <LoginPage/>
                    </div>
                </section>
            </div>
        );
    }
}

class LoginPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="container-login">
                <form className="container-form">
                    <label className="container-form-title">Ascenders login</label>
                    <div className="wrap-input">
                        <input className="input" type="text" name="email" placeholder="Email" required></input>
                    </div>
                    <div className="wrap-input">
                        <input className="input" type="text" name="password" placeholder="Password" required></input>
                    </div>
                     <div className="wrap-input">                   
                        <button className="input-button" type="submit">Login</button>
                    </div>
                </form>               
            </div>
        )
    }
}

ReactDOM.render(<AscendersApp/>,document.getElementById('app'));


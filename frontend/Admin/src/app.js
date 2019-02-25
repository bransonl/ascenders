import React from 'react';
import ReactDOM from 'react-dom';

class AscendersApp extends React.Component{
    render(){
        return (
            <div>
                <HeaderNav/>
                <HeaderHome/>
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

class HeaderHome extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <header>
                    <img></img>
                </header>
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
            <div>
                <label>Username</label>
                <input type="text" name="username" placeholder="Enter Username" required></input>

                <label>Password</label>
                <input type="text" name="password" placeholder="Enter Password" required></input>

                <button type="submit">Login</button>
            </div>
        )
    }
}

ReactDOM.render(<AscendersApp/>,document.getElementById('app'));


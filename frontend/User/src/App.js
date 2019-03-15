import React, { Component } from 'react';
import {Header} from './header.js';
import logo from './bear.png';
import './App.css';
import FirstComponent from './FirstComponent'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Ascenders</h1>
        </header>
        <Header />
        {this.props.children}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <FirstComponent displaytext="First Component Data"/>
      </div>
);
  }
}
export default App;

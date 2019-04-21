import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Button, Nav, OverlayTrigger, Popover, Navbar } from 'react-bootstrap';
import logo from './resources/accenture-purple-logo.png'
import IosNotifications from 'react-ionicons/lib/IosNotifications'
import IosListBox from 'react-ionicons/lib/IosListBox'
import IosContact from 'react-ionicons/lib/IosContact'

import '../css/reusable.css';
import '../css/NavigationBar.css';
import { AppContext } from './globalContext/AppContext';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleAccountOpen = this.handleAccountOpen.bind(this);
        this.handleAccountClose = this.handleAccountClose.bind(this);
        this.state = {
            showAccount: false,
        };
    }

    handleAccountOpen() {
        this.setState({showAccount: true});
    }
    handleAccountClose() {
        this.setState({showAccount: false});
    }

    render() {
        return (
            <Navbar className="nav">
                <Navbar.Brand>
                    <NavLink to="/">
                        <img className="nav-logo" src={logo} alt="logo"/>
                    </NavLink>
                </Navbar.Brand>
                <Nav
                    className="justify-content-end w-100"
                    onSelect={selectedKey => console.log(`${selectedKey} is clicked`)}
                >
                    <Nav.Item>
                        <a className="nav-link"><IosNotifications className="nav-icons"/></a>
                    </Nav.Item>
                    <Nav.Item>
                        <a className="nav-link"><IosListBox className="nav-icons"/></a>
                    </Nav.Item>
                    <Nav.Item>
                        <a className="nav-link" onClick={this.handleAccountOpen}><IosContact className="nav-icons"/></a>
                        <Modal 
                            show={this.state.showAccount} 
                            onHide={this.handleAccountClose}
                            backdrop={false}
                            size='sm'>
                            <Modal.Header closeButton>
                                <Modal.Title>Account</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Button onClick={this.context.logout}>Sign out</Button>
                            </Modal.Body>
                        </Modal>
                    </Nav.Item>
                </Nav>
            </Navbar>
        )
    }
}

NavigationBar.contextType = AppContext;
export default NavigationBar;

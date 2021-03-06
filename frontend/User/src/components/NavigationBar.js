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
        this.state = {
            showAccount: false,
        };
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
                    <a className="nav-link" onClick={() => {this.setState({showAccount: true})}}><IosContact className="nav-icons"/></a>
                        <Modal
                            bsPrefix="modal"
                            show={this.state.showAccount}
                            onHide={() => {this.setState({showAccount: false})}}
                            backdrop={false}
                            size='lg'>
                            <Modal.Header closeButton>
                                <Modal.Title>Account</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                'Quote of the Day: Do now, think later'
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.context.logout}>Sign out</Button>
                            </Modal.Footer>
                        </Modal>
                    </Nav.Item>
                </Nav>
            </Navbar>
        )
    }
}

NavigationBar.contextType = AppContext;
export default NavigationBar;

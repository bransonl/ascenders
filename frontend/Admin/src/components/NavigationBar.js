import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Button, Nav, Navbar, Row, Col, Accordion, Card, Form } from 'react-bootstrap';
import logo from './resources/accenture-purple-logo.png'
import IosNotifications from 'react-ionicons/lib/IosNotifications'
import IosListBox from 'react-ionicons/lib/IosListBox'
import IosContact from 'react-ionicons/lib/IosContact'
import axios from 'axios';

import '../css/reusable.css';
import '../css/NavigationBar.css';
import { AppContext } from './globalContext/AppContext';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAccount: false,
        };
    this.submitNewAdmin = this.submitNewAdmin.bind(this);
    this.submitNewUser = this.submitNewUser.bind(this);
    }

    submitNewAdmin(e) {
        console.log("\nCreating new admin...")
        e.preventDefault();
        const username = e.target.elements.adminUser.value;
        const password = e.target.elements.adminPwd.value;
        const email = e.target.elements.adminEmail.value;
        const phone = e.target.elements.adminPhone.value;
        const role = 'admin';
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url = `http://127.0.0.1:3000/users`;
        axios.post(url, {
            username: username,
            password: password,
            email: email,
            phone: phone,
            role: role
        }, {
            headers: {
                Authorization: token,
            }
        })
        .then(res => {console.log("Response: ", res)});
    }

    submitNewUser(e) {
        e.preventDefault();
        const username = e.target.elements.userUser.value;
        const password = e.target.elements.userPwd.value;
        const email = e.target.elements.userEmail.value;
        const phone = e.target.elements.userPhone.value;
        const role = 'user';
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url = `http://127.0.0.1:3000/users`;
        axios.post(url, {
            username: username,
            password: password,
            email: email,
            phone: phone,
            role: role
        }, {
            headers: {
                Authorization: token
            }
        })
        .then(res => console.log("Response: ", res));
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
                                <Accordion>
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Register New Admin
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <Form onSubmit={this.submitNewAdmin}>
                                                    <Form.Group as={Row}>
                                                        <Form.Label column sm="2">Username</Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control
                                                                autoFocus
                                                                name="adminUser" 
                                                                type="text" 
                                                                placeholder="Enter username"
                                                                required/>
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row}>
                                                        <Form.Label column sm="2">Password</Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control
                                                                name="adminPwd" 
                                                                type="password" 
                                                                placeholder="Enter password"
                                                                required/>
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row}>
                                                        <Form.Label column sm="2">E-mail</Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control
                                                                name="adminEmail" 
                                                                type="email" 
                                                                placeholder="name@example.com"
                                                                required/>
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row}>
                                                        <Form.Label column sm="2">Phone Number</Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control
                                                                name="adminPhone" 
                                                                type="number" 
                                                                placeholder="optional: Enter your phone number"
                                                                />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row}>
                                                        <Col sm="6"/>
                                                        <Col sm="2">
                                                            <Button onClick={() => {this.setState({showAccount: false})}} variant="primary" type="submit">Register!</Button>
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                Register New User
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                                <Form onSubmit={this.submitNewUser}>
                                                    <Form.Group as={Row}>
                                                        <Form.Label column sm="2">Username</Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control
                                                                autoFocus
                                                                name="userUser" 
                                                                type="text" 
                                                                placeholder="Enter username"
                                                                required/>
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row}>
                                                        <Form.Label column sm="2">Password</Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control
                                                                autoFocus
                                                                name="userPwd" 
                                                                type="password" 
                                                                placeholder="Enter password"
                                                                required/>
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row}>
                                                        <Form.Label column sm="2">E-mail</Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control
                                                                name="userEmail" 
                                                                type="email" 
                                                                placeholder="name@example.com"
                                                                required/>
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row}>
                                                        <Form.Label column sm="2">Phone Number</Form.Label>
                                                        <Col sm="6">
                                                            <Form.Control
                                                                name="userPhone" 
                                                                type="number" 
                                                                placeholder="optional: Enter your phone number"
                                                                />
                                                        </Col>
                                                    </Form.Group>
                                                    <Form.Group as={Row}>
                                                        <Col sm="6"/>
                                                        <Col sm="2">
                                                            <Button onClick={() => {this.setState({showAccount: false})}} variant="primary" type="submit">Register!</Button>
                                                        </Col>
                                                    </Form.Group>
                                                </Form>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>

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

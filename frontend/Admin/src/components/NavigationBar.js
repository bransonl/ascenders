import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Button, Nav, Navbar, Accordion, Card, Form } from 'react-bootstrap';
import logo from './resources/accenture-purple-logo.png'
import IosNotifications from 'react-ionicons/lib/IosNotifications'
import IosContact from 'react-ionicons/lib/IosContact'
import axios from 'axios';
import socketIo from 'socket.io-client';

import '../css/reusable.css';
import '../css/NavigationBar.css';
import { AppContext } from './globalContext/AppContext';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAccount: false,
            showNotification: false,
            notifications: [],
        };
        this.submitPreferences = this.submitPreferences.bind(this);
        this.triggerNotifications = this.triggerNotifications.bind(this);
    }

    componentDidMount() {
        const socket = socketIo("/notifications");
        this.setState({socket});
        socket.on('auth', (ack) => {
            ack('Bearer ' + this.context.token);
        });

        socket.emit('get', this.context.username, (res) => {
            const notifications = res.data;
            this.setState({
                notifications,
            });
        });

        socket.on('new', (notification) => {
            const existing = this.state.notifications;
            this.setState({
                notifications: [notification, ...existing],
            });
        })
    }

    componentWillUnmount() {
        this.state.socket.close();
    }

    triggerNotifications() {
        this.setState({showNotification: true});
        this.state.notifications.forEach((notification, index) => {
            if (!notification.read) {
                this.state.socket.emit('read', notification.objectId, (res) => {
                    if (res.success) {
                        this.state.notifications[index].read = true;
                    }
                });
            }
        });
    }

    submitPreferences(e) {
        console.log("\nSetting preferences...");
        e.preventDefault();

        const notifyByEmail  = e.target.elements.emailNotif.checked;
        const notifyBySms = e.target.elements.phoneNotif.checked;
        console.log(notifyByEmail, notifyBySms);
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url = `http://${this.context.apiUri}/userPreferences/${sessionStorage.getItem("username")}`
        axios.put(url, {
            notifyByEmail: notifyByEmail,
            notifyBySms: notifyBySms
        }, {
            Authorization: token,
            'Content-Type': 'application/json'
        })
        .then(res => {
            console.log("hei")
            console.log(res)
        });
    }

    render() {
        const notifications = [];
        this.state.notifications.forEach((notification, index) => {
            notifications.unshift(
                <li key={`notification-${index}`}>
                    <span className={notification.read ? "" : "unread-notification"}><b>{notification.title}:</b> {notification.body}</span>
                </li>
            );
        });
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
                        <a className="nav-link" onClick={this.triggerNotifications}><IosNotifications className="nav-icons"/></a>
                        <Modal
                            bsPrefix="modal"
                            show={this.state.showNotification}
                            onHide={() => {this.setState({showNotification: false})}}
                            backdrop={false}
                            size='lg'>
                            <Modal.Header closeButton>
                                <Modal.Title>Notification</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul>{notifications}</ul>
                            </Modal.Body>
                        </Modal>
                    </Nav.Item>
                    <Nav.Item>
                        <a className="nav-link" onClick={() => {this.setState({showAccount: true})}}><IosContact className="nav-icons"/></a>
                        <Modal
                            bsPrefix="modal"
                            show={this.state.showAccount}
                            onHide={() => {this.setState({showAccount: false})}}
                            backdrop={false}
                            size='sm'>
                            <Modal.Header closeButton>
                                <Modal.Title>Account</Modal.Title>
                            </Modal.Header>
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            User Preference
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <Form onSubmit={this.submitPreferences}>
                                                <Form.Group>
                                                    <Form.Check name="emailNotif" type="checkbox" label="Email Notification"/>
                                                    <Form.Check name="phoneNotif" type="checkbox" label="Phone Notification"/>
                                                </Form.Group>
                                                <Button variant="primary" type="submit">Save</Button>
                                            </Form>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
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

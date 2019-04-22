import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import '../css/reusable.css';
import '../css/Ticket.css';
import { AppContext } from './globalContext/AppContext';
import AddUser from './AddUser';
import Axios from 'axios';


class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userModalShow: false,

            users: [],
            preview: null,
        };
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh() {
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url =`http://127.0.0.1:3000/users`;
        Axios.get(url, {
            headers: {
                Authorization: token
            },
        })
        .then(res => {
            console.log("Response: ", res);
            this.setState({users: res.data});
            console.log("Users: ", this.state.users)
        });
    }

    componentDidMount() {
        console.log("User component mounted...")
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url =`http://127.0.0.1:3000/users`;
        Axios.get(url, {
            headers: {
                Authorization: token
            },
        })
        .then(res => {
            console.log("Response: ", res);
            this.setState({users: res.data});
            console.log("Users: ", this.state.users)
        });
    }

    render() {
        return (
            <div className="ticket-wrapper">
                <Container bsPrefix="action-bar">
                    <div className="add-ticket right">
                        <Button
                            bsPrefix="content-btn"
                            onClick={() => this.setState({userModalShow: true})}>
                                Register
                        </Button>
                        <AddUser
                            show={this.state.userModalShow}
                            onHide={() => this.setState({userModalShow: false})}
                            onExit={this.handleRefresh}
                            autoFocus/>
                    </div>

                </Container>
                <Container bsPrefix="header-container">
                    <Row>
                        <Col>Username</Col>
                        <Col>Role</Col>
                        <Col md={6}>E-mail</Col>
                        <Col>Phone</Col>
                    </Row>
                </Container>
                <div className="body-container">
                    {this.state.users.map((user, index) => {                    
                        return (
                            <Container bsPrefix="user-container">
                                <Link
                                    className="link--text"
                                    key={`user-${index}`}
                                    to={{
                                        pathname: `/users/${user.userId}`,
                                    }}
                                >
                                    <Row>
                                        <Col>{user.username}</Col>
                                        <Col>{user.role}</Col>
                                        <Col md={6}>{user.email}</Col>
                                        <Col>{user.phone}</Col>
                                    </Row>
                                </Link>
                            </Container>
                        );
                    })}
                </div>
            </div>
        );
    }
}

Ticket.contextType = AppContext;
export default Ticket;

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MdCreate from 'react-ionicons/lib/MdCreate';
import MdClose from 'react-ionicons/lib/MdClose';

import { AppContext } from './globalContext/AppContext';

import '../css/reusable.css';
import '../css/Archives.css';
import '../css/Ticket.css';

class Archives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            preview: null,
            statuses: {},

        };
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh() {
        const token = 'Bearer ' + sessionStorage.getItem("token");
        fetch(`http://${this.context.apiUri}/tickets/admin/closed`, {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log("\nSetting state...");
            this.setState({tickets: [...res]});
            console.log("State is successfully set...\nTickets: ", this.state);
        })
        .catch(err => console.log(err));
    }

    componentDidMount() {
        console.log("Ticket component mounted...")
        console.log("Current context: ", this.context);

        // const token = 'Bearer ' + this.context.token
        const token = 'Bearer ' + sessionStorage.getItem("token");
        fetch(`http://${this.context.apiUri}/tickets/admin/closed`, {
            method: 'GET',
            headers: {
                'Authorization': token
            },
        })
        .then(res => res.json())
        .then(res => {
            console.log("\nSetting state...");
            this.setState({tickets: [...res]});
            console.log("State is successfully set...\nTickets: ", this.state);
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="ticket-wrapper">
                <Container bsPrefix="header-container">
                    <Row>
                        <Col>Date Submitted</Col>
                        <Col>Creator</Col>
                        <Col md={4}>Title</Col>
                        <Col>Status</Col>
                        <Col>Action</Col>
                    </Row>
                </Container>
                <div className="body-container">
                    {this.state.tickets.map((ticket, index) => {
                        return (
                            <Container bsPrefix="ticket-container">
                                <Link
                                    className="link--text"
                                    key={`ticket-${index}`}
                                    to={{
                                        pathname: `/archive/preview/${ticket.objectId}`,
                                    }}
                                >
                                    <Row>
                                        <Col>{ticket.createdAt}</Col>
                                        <Col>{ticket.creator}</Col>
                                        <Col md={4}>
                                            {ticket.title}
                                        </Col>
                                        <Col>{ticket.status}</Col>
                                        <Col>
                                            <MdCreate className="options-icon" />
                                            <MdClose className="options-icon"/>
                                        </Col>
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

Archives.contextType = AppContext;
export default Archives;

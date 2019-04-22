import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MdCreate from 'react-ionicons/lib/MdCreate';
import MdClose from 'react-ionicons/lib/MdClose';

import '../css/reusable.css';
import '../css/Ticket.css';
import { AppContext } from './globalContext/AppContext';


class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketModalShow: false,
            labelModalShow: false,
            tickets: [],
            preview: null,
            statuses: {},
        };
    }

    componentDidMount() {
        console.log("Ticket component mounted...")
        console.log("Current context: ", this.context);

        // const token = 'Bearer ' + this.context.token
        const token = 'Bearer ' + sessionStorage.getItem("token");
        fetch(`http://${this.context.apiUri}/tickets/user/closed`, {
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
                            <Link
                                key={`ticket-${index}`}
                                to={{
                                    pathname: `/archive/preview/${ticket.objectId}`,
                                }}
                            >
                                <Container bsPrefix="ticket-container">
                                    <Row>
                                        <Col>{ticket.createdAt}</Col>
                                        <Col>{ticket.creator}</Col>
                                        <Col md={4}>{ticket.title}</Col>
                                        <Col>{ticket.status}</Col>
                                        <Col>
                                            <MdCreate className="options-icon" />
                                            <MdClose className="options-icon"/>
                                        </Col>
                                    </Row>
                                </Container>
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
}

Archive.contextType = AppContext;
export default Archive;

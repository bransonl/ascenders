import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../css/reusable.css';
import '../css/Ticket.css';

export default class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: []
        };
    }

    componentDidMount() {
        const url = `http://127.0.0.1:3000/tickets/user`;
        fetch(url, {
            method: 'GET',
        })
    }

    render() {
        return (
                <div className="ticket-wrapper">
                    <Container bsPrefix="header-container">
                        <Row>
                            <Col>Date Submitted</Col>
                            <Col>Category</Col>
                            <Col md={4}>Title</Col>
                            <Col>Ticket Id</Col>
                            <Col>Action</Col>
                        </Row>
                    </Container>
                </div>    
        );
    }
}
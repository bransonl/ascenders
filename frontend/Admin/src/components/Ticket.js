import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import '../css/reusable.css';
import '../css/Ticket.css';
import { AppContext } from './globalContext/AppContext';

class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: []
        };
    }

    componentDidMount() {
        console.log("Component mounted...")
        console.log("Context: ", this.context);
        fetch('http://127.0.0.1:3000/tickets/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.context.token
            }, 
        })
        .then(res => res.json()) 
        .then(res => {
            console.log(res);
            this.setState({tickets: [...res.results]});
            console.log("state: ", this.state);
            console.log(typeof(this.state.tickets[0].createdAt));
        })
        .catch(err => console.log(err));
    }

    render() {
        console.log("rendering...");
        console.log(this.state.tickets);
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
                    {this.state.tickets.map((ticket, index) => {
                        console.log("ticket: ", ticket);
                        return (
                            <div key={index}>
                                <Container bsPrefix="ticket-container">
                                    <Row>
                                        <Col>{ticket.createdAt}</Col>
                                        <Col>{ticket.status}</Col>
                                        <Col md={4}>{ticket.title}</Col>
                                        <Col>{ticket.objectId}</Col>
                                        <Col>Options</Col>
                                    </Row>
                                </Container>
                            </div>
                        );
                    })}
                </div>    
        );
    }
}

Ticket.contextType = AppContext;
export default Ticket;
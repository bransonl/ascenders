import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import '../css/reusable.css';
import '../css/Ticket.css';
import { AppContext } from './globalContext/AppContext';
import AddTicket from './AddTicket';


class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketModalShow: false,
            labelModalShow: false,
            tickets: [],
            preview: null,
            statuses: {},
        };
        this.handleRefresh = this.handleRefresh.bind(this);
    }

    handleRefresh() {
        const token = 'Bearer ' + sessionStorage.getItem("token");
        fetch('http://127.0.0.1:3000/tickets/admin', {
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

    handleRefresh() {
        const token = 'Bearer ' + sessionStorage.getItem("token");
        fetch(`http://${this.context.apiUri}/tickets/user`, {
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
        fetch(`http://${this.context.apiUri}/tickets/user`, {
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
        let ticketModalClose = () => this.setState({ticketModalShow: false})
        return (
            <div className="ticket-wrapper">
                <Container bsPrefix="action-bar">
                    <div className="add-ticket right">
                        <Button
                            bsPrefix="content-btn"
                            onClick={() => this.setState({ticketModalShow: true})}>
                                Add Ticket
                        </Button>
                        <AddTicket
                            show={this.state.ticketModalShow}
                            onHide={ticketModalClose}
                            onExited={this.handleRefresh}/>
                    </div>

                </Container>
                <Container bsPrefix="header-container">
                    <Row>
                        <Col md={2}>Date Submitted</Col>
                        <Col md={2}>Creator</Col>
                        <Col md={5}>Title</Col>
                        <Col>Status</Col>
                        <Col>Tag</Col>
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
                                        pathname: `/tickets/preview/${ticket.objectId}`,
                                    }}
                                >
                                    <Row>
                                        <Col className="text-center" md={2}>{ticket.createdAt}</Col>
                                        <Col className="text-center" md={2}>{ticket.creator}</Col>
                                        <Col className="text-left" md={5}>{ticket.title}</Col>
                                        <Col>{ticket.status}</Col>
                                        <Col>{ticket.tag}</Col>
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

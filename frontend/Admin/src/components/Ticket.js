import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MdCreate from 'react-ionicons/lib/MdCreate';
import MdClose from 'react-ionicons/lib/MdClose';

import '../css/reusable.css';
import '../css/Ticket.css';
import { AppContext } from './globalContext/AppContext';
import AddTicket from './AddTicket';
import AddLabel from './AddLabel';


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

    componentDidMount() {
        console.log("Ticket component mounted...")
        // const token = 'Bearer ' + this.context.token
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

    render() {
        let ticketModalClose = () => this.setState({ticketModalShow: false})
        let labelModalClose = () => this.setState({labelModalShow: false})
        return (
            <div className="ticket-wrapper">
                <Container bsPrefix="action-bar">
                    <div className="add-ticket right">
                        <Button
                            bsPrefix="content-btn"
                            onClick={() => this.setState({labelModalShow: true})}>
                                Add Label
                        </Button>
                        <AddLabel
                            show={this.state.labelModalShow}
                            onHide={labelModalClose}
                            onExit={this.handleRefresh}
                            autoFocus/>
                    </div>
                    <div className="add-ticket right">
                        <Button
                            bsPrefix="content-btn"
                            onClick={() => this.setState({ticketModalShow: true})}>
                                Add Ticket
                        </Button>
                        <AddTicket
                            show={this.state.ticketModalShow}
                            onHide={ticketModalClose}
                            onExited={this.handleRefresh}
                            autoFocus/>
                    </div>


                </Container>
                <Container bsPrefix="header-container">
                    <Row>
                        <Col>Date Submitted</Col>
                        <Col>Creator</Col>
                        <Col md={4}>Title</Col>
                        <Col>Status</Col>
                        <Col>Label</Col>
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

Ticket.contextType = AppContext;
export default Ticket;

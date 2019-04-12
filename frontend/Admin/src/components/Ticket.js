import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import IosAdd from 'react-ionicons/lib/IosAdd';

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
            preview: null
        };
    }

    componentDidMount() {
        console.log("Ticket component mounted...")
        console.log("Current context: ", this.context);
        fetch('http://127.0.0.1:3000/tickets/admin', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.context.token
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
        let modalClose = () => this.setState({ticketModalShow: false})
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
                            onHide={modalClose}/>
                    </div>
                    <div className="add-ticket right">
                        <Button 
                            bsPrefix="content-btn" 
                            onClick={() => this.setState({ticketModalShow: true})}>
                                {/* <IosAdd className="IosAdd"/> */}
                                Add Ticket
                        </Button>
                        <AddTicket
                            show={this.state.ticketModalShow}
                            onHide={modalClose}/>
                    </div>
                    
                </Container>
                <Container bsPrefix="header-container">
                    <Row>
                        <Col>Date Submitted</Col>
                        <Col>Creator</Col>
                        <Col md={4}>Title</Col>
                        <Col>Ticket Id</Col>
                        <Col>Action</Col>
                    </Row>
                </Container>
                    {this.state.tickets.map((ticket, index) => {
                        return (
                            <div key={index}>
                                <Link 
                                    to={{
                                        pathname: `/tickets/preview/${ticket.objectId}`,
                                    }}                
                                >
                                    <Container bsPrefix="ticket-container">
                                        <Row>
                                            <Col>{ticket.createdAt}</Col>
                                            <Col>{ticket.creator}</Col>
                                            <Col md={4}>{ticket.title}</Col>
                                            <Col>{ticket.objectId}</Col>
                                            <Col>Options</Col>
                                        </Row>
                                    </Container>
                                </Link>
                            </div>
                        );
                    })}
            </div>    
        );
    }
}

Ticket.contextType = AppContext;
export default Ticket;
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import IosAdd from 'react-ionicons/lib/IosAdd';

import '../css/reusable.css';
import '../css/Ticket.css';
import { AppContext } from './globalContext/AppContext';
import AddTicket from './AddTicket';

class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            modalShow: false
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
            this.setState({tickets: [...res.results]});
            console.log("state: ", this.state);
        })
        .catch(err => console.log(err));
    }

    render() {
        let modalClose = () => this.setState({modalShow: false})
        return (
            <div className="ticket-wrapper">
                <Container bsPrefix="action-bar">
                    <Row>
                        <div className="add-ticket right">
                            <Button 
                                bsPrefix="content-btn" 
                                onClick={() => this.setState({modalShow: true})}>
                                    <IosAdd className="IosAdd"/>Add Ticket
                            </Button>
                            <AddTicket
                                show={this.state.modalShow}
                                onHide={modalClose}/>
                        </div>
                    </Row>
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
                            <Container bsPrefix="ticket-container">
                                <Row>
                                    <Col>{ticket.createdAt}</Col>
                                    <Col>{ticket.creator}</Col>
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
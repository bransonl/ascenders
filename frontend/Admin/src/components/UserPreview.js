import React from 'react';
import { Container, Row, Col, Media, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../css/reusable.css';
import '../css/TicketPreview.css';
import '../css/Ticket.css';
import { AppContext } from '../components/globalContext/AppContext'

class UserPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            preview: null,

        }
    }

    componentDidMount() {
        console.log("Ticket component mounted...")
        // const token = 'Bearer ' + this.context.token
        const token = 'Bearer ' + sessionStorage.getItem("token");
        fetch(`http://${this.context.apiUri}/tickets/admin`, {
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
            <div className="preview-app">

                <div className="profile-ticketpreview">
                    <Media>
                        <Image 
                            className="avatar--ticketpreview"
                            src={`https://avatars3.githubusercontent.com/u/40631483?s=460&v=4`}
                            roundedCircle/>
                        <Media.Body>
                            <p className="profile--creator">Andre Hadianto Lesmana</p>
                            <p className="profile--company">Singapore University of Technology and Design</p>
                            <p className="profile--email">andrehadianto@gmail.com</p>
                        </Media.Body>
                    </Media>
                </div>

                <Container bsPrefix="header-container">
                    <Row>
                        <Col md={2}>Date Submitted</Col>
                        <Col md={2}>Creator</Col>
                        <Col md={4}>Title</Col>
                        <Col>Status</Col>
                        <Col>Tag</Col>
                        <Col>Priority</Col>
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
                                        <Col md={4}>{ticket.title}</Col>
                                        <Col>{ticket.status}</Col>
                                        <Col>Tag</Col>
                                        <Col>Priority</Col>
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


UserPreview.contextType = AppContext;
export default UserPreview;

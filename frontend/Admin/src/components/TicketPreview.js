import React from 'react';

import { Button, Container, Col, Row, Media, Form } from 'react-bootstrap';

import '../css/reusable.css';
import '../css/TicketPreview.css';
import axios from 'axios'
import { AppContext } from '../components/globalContext/AppContext'

class TicketPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preview: [],
            replies: []
        }
    }

    componentDidMount() {
        const{match: {params}} = this.props;
        const url = `http://127.0.0.1:3000/tickets/${params.ticketId}`;
        axios.get(url, {
                headers: {
                    Authorization: "Bearer " + this.context.token
                }
            }    
        )
        .then(res => {
            this.setState({preview: res.data});
            console.log("Current state: ", this.state);
        })
    }

    render() {
        return (
            <div className="preview-app">
                <Container bsPrefix="container-ticketpreview header-preview">
                    <Row bsPrefix="row header-ticketpreview">
                        <Col md={6}>
                            <Media>
                                <Media.Body>
                                    <h5>{this.state.preview.title}</h5>
                                    <p>{this.state.preview.creator}</p>
                                </Media.Body>
                            </Media>
                        </Col>
                        <Col>
                            <Media>
                                <Media.Body>
                                    <h6>Last Updated: </h6>
                                    <p>{this.state.preview.updatedAt}</p>
                                </Media.Body>
                            </Media>
                        </Col>
                        <Col>
                            <Media>
                                <Media.Body>
                                    <h6>Date Created: </h6>
                                    <p>{this.state.preview.createdAt}</p>
                                </Media.Body>
                            </Media>
                        </Col>        
                    </Row>
                </Container >
                <Container bsPrefix="container-ticketpreview body-preview">
                    <Row bsPrefix="preview-ticketpreview">
                        <p>{this.state.preview.body}</p>
                    </Row>
                </Container>
                <Container bsPrefix="container-ticketpreview footer-preview">
                    <Row bsPrefix="row footer-ticketpreview">
                        <Form className="form sendmessage-preview">
                            <Col md={10}>
                            <Form.Group>
                                <Form.Control 
                                    bsPrefix="form-control form-control-textarea-preview"
                                    as="textarea"
                                    type="text"
                                    name="send-messages"
                                    placeholder="Enter your messages"
                                    />
                            </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group>
                                <Form.Control 
                                    type="file"
                                    name="uploadFile"
                                    />
                                <Button
                                    variant="primary"
                                    type="submit"
                                    />
                            </Form.Group>
                            </Col>
                        </Form>
                    </Row>
                </Container>
            </div>
        );
    }
}

TicketPreview.contextType = AppContext;
export default TicketPreview;
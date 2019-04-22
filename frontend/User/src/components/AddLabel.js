import React from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';

import '../css/reusable.css';
import '../css/AddTicket.css';
import { AppContext } from './globalContext/AppContext.js';


class AddLabel extends React.Component {
    constructor(props) {
        super(props);
        this.submitTicket = this.submitTicket.bind(this);
        this.state = {
            title: null,
            body: null,
        };
    }

    submitTicket(e) {
        console.log("submitting...");
        e.preventDefault();
        const title = e.target.elements.title.value;
        const body = e.target.elements.description.value;
        fetch(`http://${this.context.apiUri}/tickets`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, body}),
        })
        .then(res => res.json())
        .then(res => {
            this.setState({title, body, ticketId: res.objectId});
        })
        .catch(res => console.log(err));

        e.target.elements.title.value = "";
        e.target.elements.description.value = "";
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="create-ticket-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="create-ticket-modal">Create Label</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.submitTicket}>
                    <Modal.Body>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Label Name</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    name="title"
                                    type="text"
                                    placeholder="Enter label" />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Cancel</Button>
                        <Button variant="primary" type="submit" onClick={this.props.onHide}>Create</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

AddLabel.contextType = AppContext;
export default AddLabel;

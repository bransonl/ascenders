import React from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';

import '../css/reusable.css';
import '../css/AddTicket.css';
import { AppContext } from './globalContext/AppContext.js';
import axios from 'axios';


class AddTicket extends React.Component {
    constructor(props) {
        super(props);
        this.submitTicket = this.submitTicket.bind(this);
        // this.onChange = this.onChange.bind(this);
        // this.fileUpload = this.fileUpload.bind(this);
        this.state = {
            title: null,
            body: null,

            ticketId: null,
            file: []
        };
    }

    submitTicket(e) {
        console.log("submitting...");
        e.preventDefault();
        const title = e.target.elements.title.value;
        const body = e.target.elements.description.value;
        // const file = this.state.file;

        // const url = "http://127.0.0.1:3000/tickets";
        // axios.post(url, {
        //     body: title, body
        // })

        fetch('http://127.0.0.1:3000/tickets', {
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
            e.target.elements.title.value = "";
            e.target.elements.description.value = "";

            if (this.state.ticketId !== null) {
                console.log("Proceed to upload file...");
                this.fileUpload();
            }
        })
        .catch(res => console.log(err));
    }

    // onChange(e) { // called when file selected
    //     this.setState({file: e.target.files[0]});
    // }

    fileUpload() {
        console.log("\nAttempting to upload file...");
        const {ticketId, file} = this.state;
        const formData = new FormData();
        formData.append('file', file, 'file');
        const url = `http://127.0.0.1:3000/tickets/upload/${ticketId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + this.context.token
            },
            body: {
                file: formData
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log("Response fileUpload: ", res);
        })
        .catch(res => console.log(err));
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
                    <Modal.Title id="create-ticket-modal">Create Ticket</Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.submitTicket}>
                    <Modal.Body>                   
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Title</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    name="title" 
                                    type="text" 
                                    placeholder="Enter title" />
                            </Col>
                        </Form.Group>   
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Description</Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    as="textarea" 
                                    name="description"
                                    type="text"
                                    placeholder="Enter Description"
                                    bsPrefix="form-control-textarea form-control"/>
                            </Col>    
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Upload</Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    id="formControlsFile"
                                    type="file"
                                    multiple
                                    label="File" />
                            </Col>
                        </Form.Group>                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Cancel</Button>
                        <Button variant="primary" type="submit" onClick={this.props.onHide}>Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

AddTicket.contextType = AppContext;
export default AddTicket;
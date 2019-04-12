import React from 'react';
import { Col, Row, Modal, Form, Button } from 'react-bootstrap';

import '../css/reusable.css';
import '../css/AddTicket.css';
import { AppContext } from './globalContext/AppContext.js';
import axios, { post } from 'axios';


class AddTicket extends React.Component {
    constructor(props) {
        super(props);
        this.submitTicket = this.submitTicket.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.state = {
            title: null,
            body: null,

            ticketId: null,
            file: null
        };
    }

    submitTicket(e) {
        console.log("\nCreating new ticket...");
        e.preventDefault();
        const title = e.target.elements.title.value;
        const body = e.target.elements.description.value;

        // const token = 'Bearer ' + this.context.token
        const token = 'Bearer ' + sessionStorage.getItem("token");
        if (title === "" || body === "") {
            alert("Please fill the title/body!");
        } else {
            fetch('http://127.0.0.1:3000/tickets', {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, body}),
            })
            .then(res => res.json())
            .then(res => {
                this.setState({title, body, ticketId: res.objectId});
                console.log("Current state: ", this.state);
                e.target.elements.title.value = "";
                e.target.elements.description.value = "";
                if (this.state.file !== null) {
                    console.log("\n Trying to upload file...");
                    this.handleFileUpload(this.state.file)
                    .then((res) => {
                        console.log(res);
                    })
                }
                
            })
            .catch(err => console.log(err));
        }
    }

    onChange(e) {
        this.state.file = e.target.files[0];
        console.log("\nFile content: ", this.state.file, "\n");
    }
    handleFileUpload(file) {
        // const token = 'Bearer ' + this.context.token
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url = `http://127.0.0.1:3000/tickets/upload/${this.state.ticketId}`;
        let formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                Authorization: token
            }
        }
        return axios.put(url, formData, config);
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
                                    label="File"
                                    onChange={this.onChange}/>
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
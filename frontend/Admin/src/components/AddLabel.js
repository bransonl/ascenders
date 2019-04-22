import React from 'react';
import { Col, Row, Modal, Form, Button, InputGroup } from 'react-bootstrap';

import '../css/reusable.css';
import '../css/AddTicket.css';
import { AppContext } from './globalContext/AppContext.js';


class AddLabel extends React.Component {
    constructor(props) {
        super(props);
        this.submitLabel = this.submitLabel.bind(this);
        this.state = {
            selectedLabelType: "",
            labelName: "",
        };
    }

    submitLabel(e) {
        console.log("\nSubmitting label...");
        e.preventDefault();

        const labelType = e.target.elements.labelType.value;
        const labelName = e.target.elements.labelName.value;
        console.log(labelType, labelName);
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url = `http://127.0.0.1:3000/label/${labelType}`

        if (labelType === 'tag') {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: labelName}),
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({labelName});
            })
            .catch(err => console.log(err));
        } else {
            const labelColor = "#" + e.target.elements.labelColor.value;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: labelName, colour: labelColor}),
            })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
        
    }

    render() {
        console.log("\nRendering...");
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
                <Form onSubmit={this.submitLabel}>
                    <Modal.Body>   
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Label Type</Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" 
                                name="labelType"
                                onChange={(e) => {
                                    this.state.selectedLabelType= e.target.value;
                                    this.forceUpdate();
                                }}>
                                    <option value="status">Status</option>    
                                    <option value="priority">Priority</option>    
                                    <option value="tag">Tag</option>
                                </Form.Control>    
                            </Col>
                        </Form.Group>                 
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Label Name</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    name="labelName" 
                                    type="text" 
                                    placeholder="Enter label name" />
                            </Col>
                        </Form.Group>
                        {this.state.selectedLabelType !== "tag" &&
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">Label Color</Form.Label>
                                <Col sm="10">
                                    <InputGroup className="mb-4">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                                        </InputGroup.Prepend>
                                    
                                    <Form.Control
                                        name="labelColor"
                                        type="text" 
                                        placeholder="Enter color in hex" />
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        }  
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
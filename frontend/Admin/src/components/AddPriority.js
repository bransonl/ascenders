import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

import '../css/reusable.css';
import '../css/AddTicket.css';
import { AppContext } from './globalContext/AppContext.js';


class AddPriority extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: [],
        }
        this.submitAssign = this.submitAssign.bind(this);
    }

    submitAssign(e) {
        e.preventDefault();


    }

    componentDidMount() {
        console.log("\nMounting AddPriority Modal...");
        const token = "Bearer " + sessionStorage.getItem("token");
        const url = `http://${this.context.apiUri}/tickets/addpriority/${this.props.ticketId}`;
        axios.get(url, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            this.setState({admins: res.data});
            console.log(this.state)
        });
    }

    render() {
        return (
            <Modal
                {...this.props}
                bsPrefix="modal" 
                centered
                size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Admin to the Tickets</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.submitAssign}>
                        <Form.Group>
                            {this.state.admins.map((admin, index) => {
                                return (
                                    <Form.Check name={`admin-${admin.username}`} type="checkbox" label={admin.username} key={`admin-${index}`}/>
                                );
                            })}
                        </Form.Group>
                        <Form.Group>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="submit" onClick={this.props.onHide}>Assign</Button>
                </Modal.Footer>
            </Modal>
            
        );
    }
}

AddPriority.contextType = AppContext;
export default AddPriority;
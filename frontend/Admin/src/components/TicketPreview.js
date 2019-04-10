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
        this.reply = this.reply.bind(this);
    }

    reply(e) {
        e.preventDefault();
        console.log("Sending reply...");
        const sendMessage = e.target.elements.sendmessages.value;
        console.log(this.state.preview);
        if (sendMessage != null) {
            console.log("Message submitted.\nFetching from API...");
            const url = `http://127.0.0.1:3000/tickets/${this.state.preview.objectId}/comments`;
            axios.post(url, {
                message: sendMessage
            }, {
                headers: {
                    Authorization: "Bearer " + this.context.token
                },
            })
            .then(res => console.log("response: ", res))
            .then (
                axios.get(url, {
                    headers: {
                        Authorization: "Bearer " + this.context.token
                    }
                })
                .then(res => {
                    console.log("Uploading replies...");
                    this.setState({replies: [...res.data.messages]});
                    console.log("State is successfully set...\nCurrent replies: ", this.state.replies);
                })
            );
            e.target.elements.sendmessages.value = "";
        } else {
            console.log("No message to send...");
        }
    }

    componentDidMount() {
        console.log("Ticket preview is mounted...")
        const{match: {params}} = this.props;
        const url = `http://127.0.0.1:3000/tickets/${params.ticketId}`;
        axios.get(url, {
            headers: {
                Authorization: "Bearer " + this.context.token
            }
        })
        .then(res => {
            console.log("Retrieving ticket data...");
            this.setState({preview: res.data});
            console.log("Ticket data has been successfully updated!\nCurrent state: ", this.state);
        })
        .then(res => {
            console.log("Retrieving ticket comments...");
            const replyURL = `http://127.0.0.1:3000/tickets/${params.ticketId}/comments`;
            axios.get(replyURL, {
                headers: {
                    Authorization: "Bearer " + this.context.token
                }
            })
            .then(res => {
                console.log("Uploading replies...");
                this.setState({replies: [...res.data.messages]});
                console.log("State is successfully set...\nCurrent replies: ", this.state.replies);
            });
        });
    }

    render() {
        return (
            <div className="preview-app">
                <div className="header-ticketpreview">
                    <div className="title-header-ticketpreview">
                        <div className="tickettitle--ticketpreview">
                            <h5>{this.state.preview.title}</h5>
                        </div>
                        <div className="username--ticketpreview">
                            <p>{this.state.preview.creator}</p>
                        </div>
                    </div>
                    <div className="date-header-ticketpreview">
                        <div className="datecreated--ticketpreview">
                            <p>Date created: {this.state.preview.createdAt}</p>
                        </div>
                        <div className="lastupdated--ticketpreview">
                            <p>Last updated: {this.state.preview.updatedAt}</p>
                        </div>
                    </div>
                </div>
                <div className="preview-ticketpreview">
                    <div className="body--ticketpreview">
                        <p>{this.state.preview.body}</p>
                    </div>
                    {this.state.replies.map((reply, index) => {
                        return (
                            <div key={index}>
                                <div className="replies--ticketpreview">
                                    <p>{reply.message}</p>
                                </div>
                            </div>
                        );
                    })}
                    
                </div>
                <div className="footer-ticketpreview">
                    <Form onSubmit={this.reply} className="form sendmessage-preview">
                        <Form.Group bsPrefix="form-group textgroup--preview">
                            <Form.Control 
                                bsPrefix="form-control form-control-textarea-preview"
                                as="textarea"
                                type="text"
                                name="sendmessages"
                                placeholder="Enter your messages"
                            />
                            <Button
                                bsPrefix="btn-primary btn--preview"
                                variant="primary"
                                type="submit"
                             >Send</Button>                           
                        </Form.Group>
                        <Form.Group>
                            <Form.Control 
                                type="file"
                                name="uploadFile"
                            />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );
    }
}

TicketPreview.contextType = AppContext;
export default TicketPreview;
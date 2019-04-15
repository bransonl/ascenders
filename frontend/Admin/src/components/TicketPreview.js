import React from 'react';

import { Button, Form } from 'react-bootstrap';

import '../css/reusable.css';
import '../css/TicketPreview.css';
import axios, { post } from 'axios'
import { AppContext } from '../components/globalContext/AppContext'

class TicketPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preview: [],
            replies: [],
        }
        this.reply = this.reply.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    reply(e) {
        e.preventDefault();
        console.log("Sending reply...");
        const sendMessage = e.target.elements.sendmessages.value;

        // File upload
        if (this.state.file !== null) {
            console.log("\n Trying to upload file...");
            this.handleFileUpload(this.state.file).then((res) => {
                console.log(res.data);
            })
        }
        console.log(this.state.preview);
        if (sendMessage != null) {
            console.log("Message submitted.\nFetching from API...");
            // const token = 'Bearer ' + this.context.token
            const token = 'Bearer ' + sessionStorage.getItem("token");
            const url = `http://127.0.0.1:3000/tickets/${this.state.preview.objectId}/comments`;
            axios.post(url, {
                message: sendMessage
            }, {
                headers: {
                    Authorization: token
                },
            })
            .then(res => {
                console.log("response: ", res)
                axios.get(url, {
                    headers: {
                        Authorization: token
                    }
                })
                .then(res => {
                    console.log("Uploading replies...");
                    this.setState({replies: [...res.data.messages]});

                    console.log("\nScrolling to latest reply...");
                    const messagePreview = document.querySelector(".preview-ticketpreview");
                    messagePreview.scrollTop = messagePreview.scrollHeight;

                    console.log("State is successfully set...\nCurrent replies: ", this.state.replies);
                })
            });
            e.target.elements.sendmessages.value = "";
        } else {
            console.log("No message to send...");
        }
    }

    onChange(e) {
        this.setState({file: e.target.files[0]});
    }

    handleFileUpload(file) {
        const ticketId = this.state.preview.objectId;

        // const token = 'Bearer ' + this.context.token
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url = `http://127.0.0.1:3000/tickets/upload/${ticketId}`;
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                Authorization: token
            }
        }
        return axios.put(url, formData, config);
    }

    componentDidMount() {
        console.log("\nTicket preview is mounted...")
        const{match: {params}} = this.props;
        // const token = 'Bearer ' + this.context.token
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url = `http://127.0.0.1:3000/tickets/${params.ticketId}`;
        axios.get(url, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            console.log("Retrieving ticket data...");
            this.setState({preview: res.data});
            console.log("Ticket data has been successfully updated!\nCurrent state: ", this.state);
        })
        .then(res => {
            console.log("Retrieving ticket comments...");
            // const token = 'Bearer ' + this.context.token
            const token = 'Bearer ' + sessionStorage.getItem("token");
            const replyURL = `http://127.0.0.1:3000/tickets/${params.ticketId}/comments`;
            axios.get(replyURL, {
                headers: {
                    Authorization: token
                }
            })
            .then(res => {
                console.log("Uploading replies...");
                this.setState({replies: [...res.data.messages]});

                console.log("\nScrolling to latest reply...");
                const messagePreview = document.querySelector(".preview-ticketpreview");
                messagePreview.scrollTop = messagePreview.scrollHeight;

                console.log("\nState is successfully set...\nCurrent replies: ", this.state.replies);
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
                <div className="body-ticketpreview">
                    <div className="body--ticketpreview">
                        <p>{this.state.preview.body}</p>
                    </div>
                </div>
                <div className="preview-ticketpreview">
                    
                    {this.state.replies.map((reply, index) => {
                        return (
                            <div className="replies-container--ticketpreview" key={index}>
                                <div className="replies--ticketpreview">
                                    <p><span className="sender">{reply.sender}</span><br/>{reply.message}</p>
                                </div>
                            </div>
                        );
                    })}
                    
                </div>
                <div className="footer-ticketpreview">
                    <Form ref={el => this.ref = el} onSubmit={this.reply} className="form sendmessage-preview">
                        <Form.Group bsPrefix="form-group textgroup--preview">
                            <Form.Control 
                                bsPrefix="form-control form-control-textarea-preview"
                                as="textarea"
                                type="text"
                                name="sendmessages"
                                placeholder="Enter your messages"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && e.shiftKey) {
                                        console.log("Shift + Enter...");
                                    } else if (e.key === 'Enter' && !e.shiftKey) {
                                        console.log("Enter is pressed");
                                    }
                                }}
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
                                onChange={this.onChange}
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
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Media, Button, Form, Image, Modal } from 'react-bootstrap';
import IosAttach from 'react-ionicons/lib/IosAttach';
import AssignAdmin from './AssignAdmin';

import '../css/reusable.css';
import '../css/TicketPreview.css';
import axios from 'axios'
import { AppContext } from '../components/globalContext/AppContext'

class TicketPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preview: [],
            replies: [],
            admins: [],

            showAttachment: false,
            assignModalShow: false,

            resolved: false
        }
        this.reply = this.reply.bind(this);
        this.resolve = this.resolve.bind(this);
    }

    resolve(e) {
        e.preventDefault();
        console.log("\nResolving ticket...");
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url = `http://${this.context.apiUri}/tickets/close/${this.state.preview.objectId}`
        axios.put(url, null, {
            headers: {
                Authorization: token
            },
        })
        .then(res => {
            console.log(res);
            this.setState({resolved: true});
        });
    }

    reply(e) {
        e.preventDefault();
        console.log("Sending reply...");
        const sendMessage = e.target.elements.sendmessages.value;

        console.log(this.state.preview);
        if (sendMessage != null) {
            console.log("Message submitted.\nFetching from API...");
            // const token = 'Bearer ' + this.context.token
            const token = 'Bearer ' + sessionStorage.getItem("token");
            const url = `http://${this.context.apiUri}/tickets/${this.state.preview.objectId}/comments`;
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

    componentDidMount() {
        console.log("\nTicket preview is mounted...")
        const{match: {params}} = this.props;
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url = `http://${this.context.apiUri}/tickets/${params.ticketId}`;
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
            const token = 'Bearer ' + sessionStorage.getItem("token");
            const replyURL = `http://${this.context.apiUri}/tickets/${params.ticketId}/comments`;
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
        const urlAdmin = `http://${this.context.apiUri}/users/admin`;
        axios.get(urlAdmin, {
            headers: {
                Authorization: token
            }
        })
        .then(res => {
            this.setState({admins: res.data});
        });
    }

    render() {
        if (this.state.resolved) {
            return (<Redirect to="/tickets"/>);
        } else {
            return (
                <div className="preview-app">

                    <div className="profile-ticketpreview">
                        <Media>
                            <Image 
                                className="avatar--ticketpreview"
                                src={`https://avatars3.githubusercontent.com/u/40631483?s=460&v=4`}
                                roundedCircle/>
                            <Media.Body>
                                <p className="profile--creator">{this.state.preview.creator}</p>
                                <p className="profile--company">Singapore University of Technology and Design</p>
                                <p className="profile--email">andrehadianto@gmail.com</p>
                            </Media.Body>
                        </Media>
                    </div>
                    <div className="header-ticketpreview">
                        <div className="title-header-ticketpreview">
                            <div className="tickethead--ticketpreview">
                                {this.state.preview.attachments !== "" &&                
                                    <div className="attachment--ticketpreview">
                                        <IosAttach className="icon--ticketpreview" onClick={() => {this.setState({showAttachment: true})}}/>
                                        <Modal show={this.state.showAttachment} onHide={() => {this.setState({showAttachment: false})}}>
                                            <Modal.Body><Image src={this.state.preview.attachments} className="img--ticketpreview"/></Modal.Body>
                                        </Modal>
                                    </div>                      
                                }
                                <div className="tickettitle--ticketpreview">
                                    <h5>{this.state.preview.title}</h5>
                                </div>
                            </div>
                            <div className="username--ticketpreview">
                                <p>{this.state.preview.creator}</p>
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
                        <div className="actionbar-ticketpreview">
                            <div className="tags--ticketpreview right">
                                <Button
                                    bsPrefix="content-btn"
                                    onClick={() => this.setState({assignModalShow: true})}>
                                        Add Tags
                                </Button>
                            </div>
                            <div className="label--ticketpreview right">
                                <Button
                                    bsPrefix="content-btn"
                                    onClick={() => this.setState({assignModalShow: true})}>
                                        Add Priority
                                </Button>
                            </div>
                            <div className="assign--ticketpreview right">
                                <Button
                                    bsPrefix="content-btn"
                                    onClick={() => this.setState({assignModalShow: true})}>
                                        Assign Admin
                                </Button>
                                <AssignAdmin
                                    show={this.state.assignModalShow}
                                    onHide={() => this.setState({assignModalShow: false})}
                                />
                            </div>
                            <div className="resolve--ticketpreview right">
                                <Form onSubmit={this.resolve}>
                                    <Form.Group>
                                        <Button
                                            bsPrefix="content-btn"
                                            type="submit">
                                                Resolve Ticket
                                        </Button>
                                    </Form.Group>
                                </Form>
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
                            if (reply.sender === sessionStorage.getItem("username")) {
                                return (
                                    <div className="replies-container-user--ticketpreview" key={index}>
                                        <div className="replies--ticketpreview">
                                            <p><span className="creator">{reply.sender}</span><br/>
                                            {reply.message}</p>
                                            <p className="sender--createdAt">{reply.createdAt}</p>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="replies-container--ticketpreview" key={index}>
                                        <div className="replies--ticketpreview">
                                            <p><span className="sender">{reply.sender}</span><br/>
                                            {reply.message}</p>
                                            <p className="sender--createdAt">{reply.createdAt}</p>
                                        </div>
                                    </div>
                                );
                            }
                            
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
                        </Form>
                    </div>
                </div>
            );
        }
    }
}

TicketPreview.contextType = AppContext;
export default TicketPreview;

import React from 'react';

import { Media, Button, Form, Image, Modal } from 'react-bootstrap';
import IosAttach from 'react-ionicons/lib/IosAttach';

import '../css/reusable.css';
import '../css/TicketPreview.css';
import axios from 'axios'
import { AppContext } from './globalContext/AppContext'

class ArchivesPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preview: [],
            replies: [],

            showAttachment: false
        }
        this.reply = this.reply.bind(this);
        this.resolve = this.resolve.bind(this);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    resolve(e) {
        e.preventDefault();
        console.log("\nResolving ticket...");
        const token = 'Bearer ' + sessionStorage.getItem("token");
        const url = `http://127.0.0.1:3000/tickets/close/${this.state.preview.objectId}`
        axios.put(url, null, {
            headers: {
                Authorization: token
            },
        })
        .then(res => console.log(res))
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

    handleShow() {
        this.setState({showAttachment: true});
    }
    handleClose() {
        this.setState({showAttachment: false});
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
                                    <IosAttach className="icon--ticketpreview" onClick={this.handleShow}/>

                                    <Modal show={this.state.showAttachment} onHide={this.handleClose}>
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
                                    <p><span className="sender">{reply.sender}</span><br/>
                                    {reply.message}</p>
                                    <p className="sender--createdAt">{reply.createdAt}</p>
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
                        {/* <Form.Group>
                            <Form.Control 
                                type="file"
                                name="uploadFile"
                                onChange={this.onChange}
                            />
                        </Form.Group> */}
                    </Form>
                </div>
            </div>
        );
    }
}

ArchivesPreview.contextType = AppContext;
export default ArchivesPreview;
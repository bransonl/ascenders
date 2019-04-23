import React from 'react';

import { Image, Modal } from 'react-bootstrap';
import IosAttach from 'react-ionicons/lib/IosAttach';

import '../css/reusable.css';
import '../css/TicketPreview.css';
import axios from 'axios'
import { AppContext } from './globalContext/AppContext'

class ArchivePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preview: [],
            replies: [],

            showAttachment: false
        }
    }

    componentDidMount() {
        console.log("\nTicket preview is mounted...")
        const{match: {params}} = this.props;
        // const token = 'Bearer ' + this.context.token
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
            // const token = 'Bearer ' + this.context.token
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
    }

    render() {
        return (
            <div className="preview-app">

                <div className="header-ticketpreview">
                    <div className="title-header-ticketpreview">
                        <div className="tickethead--ticketpreview">
                            {
                                this.state.preview.attachments !== "" &&
                                <div className="attachment--ticketpreview">
                                    <IosAttach className="icon--ticketpreview" onClick={() => {this.setState({showAttachment: true})}}/>
                                    <Modal show={this.state.showAttachment} onHide={() => this.setState({showAttachment: false})}>
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
                <div className="preview-labelpreview">
                    
                    {this.state.replies.map((reply, index) => {
                        if (reply.sender === this.state.preview.creator) {
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
                                        <p><span className="sender">{reply.sender}</span><br/>{reply.message}</p>
                                    </div>
                                </div>
                            );
                        }
                    })}

                </div>
            </div>
        );
    }
}

ArchivePreview.contextType = AppContext;
export default ArchivePreview;

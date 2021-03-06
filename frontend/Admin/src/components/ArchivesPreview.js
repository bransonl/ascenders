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
            admins: [],
            preview: [],
            replies: [],

            showAttachment: false
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
                <div className="preview-labelpreview">
                    
                {this.state.replies.map((reply, index) => {
                            if (reply.sender === sessionStorage.getItem("username")) {
                                return (
                                    <div className="replies-container-user--ticketpreview" key={index}>
                                        <div className="replies--ticketpreview">
                                            <p><span className="creator">{reply.sender}</span>
                                            {this.state.admins.map((admin, index) => {
                                                console.log(reply.sender, admin.username)
                                                if (reply.sender === admin.username) {
                                                    return (<span key={index} className="creator"> (admin)</span>);
                                                }
                                            })}
                                            <br/>{reply.message}</p>
                                            <p className="sender--createdAt">{reply.createdAt}</p>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="replies-container--ticketpreview" key={index}>
                                        <div className="replies--ticketpreview">
                                            <p><span className="sender">{reply.sender}</span>
                                            {this.state.admins.map((admin, index) => {
                                                console.log(reply.sender, admin.username)
                                                if (reply.sender === admin.username) {
                                                    return (<span key={index} className="sender"> (admin)</span>);
                                                }
                                            })}
                                            <br/>
                                            {reply.message}</p>
                                            <p className="sender--createdAt">{reply.createdAt}</p>
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

ArchivesPreview.contextType = AppContext;
export default ArchivesPreview;

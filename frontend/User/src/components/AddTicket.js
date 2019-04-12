import React from 'react';
import {AppContext} from './AppContext.js';

class AddTicket extends React.Component {
    constructor(props) {
        super(props);
        this.submitTicket = this.submitTicket.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.state = {
            title: null,
            body: null,
        };
    }

    submitTicket(e) {
        console.log('submitTicket called');
        e.preventDefault();
        const title = e.target.elements.title.value;
        const body = e.target.elements.description.value;
        const file = this.state.file;
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
            console.log("Response: ", res);
            console.log("State: ", this.state);
            this.fileUpload();
        })
        .catch(res => console.log(err));

        e.target.elements.title.value = "";
        e.target.elements.description.value = "";
    }

    onChange(e) { // called when file selected
        this.setState({file: e.target.files[0]});
    }

    fileUpload() {
        console.log('fileUpload called');
        const {ticketId, file} = this.state;
        const formData = new FormData();
        formData.append('file', file, 'file');
        const url = `http://127.0.0.1:3000/tickets/upload/${ticketId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + this.context.token
            },
            body: formData,
        })
        .then(res => res.json())
        .then(res => {
            console.log("Response: ", res);
            console.log("State: ", this.state);
        })
        .catch(res => console.log(err));
    }

    render() {
        return (
            <div className="main-app">
                <div className="col span-1-of-2">
                    <div className="addticket-card">
                        <div className="addticket-card-header">
                            <label>Add Ticket</label>
                        </div>
                        <div className="addticket-card-body">
                            <form onSubmit={this.submitTicket}>
                                <div className="input-wrapper">
                                    <div className="col span-1-of-4">
                                        <label>Title</label>
                                    </div>
                                    <div className="col span-3-of-4">
                                        <input name="title" placeholder="title" type="text" className="addticket-input-title"/>
                                        <small className="addticket-input-help">Describe your issue in a short sentence</small>
                                    </div>
                                </div>
                                <div className="input-wrapper">
                                    <div className="col span-1-of-4">
                                        <label>Description</label>
                                    </div>
                                    <div className="col span-3-of-4">
                                        <textarea name="description" placeholder="content" type="text" className="addticket-input-description"/>
                                    </div>
                                </div>
                                <div className="input-wrapper">
                                    <div className="col span-1-of-4">
                                        <label>Attach</label>
                                    </div>
                                    <div className="col span-3-of-4">
                                        <label htmlFor="fileupload" className="addticket-input-attach">Choose File</label>
                                        <input onChange={this.onChange} name="attach" type="file" id="fileupload"/>
                                    </div>
                                </div>
                                <div className="input-wrapper">
                                    <button className="addticket-input-button right" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddTicket.contextType = AppContext;
export default AddTicket;
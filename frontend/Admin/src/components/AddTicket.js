import React from 'react';

export default class AddTicket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            creator: null,
            objectId: null,
            title: null,
            text: null,
            file: null
        }
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }
    // static userToken = UserToken.token;

    submitTicket(e) {
        e.preventDefault();
        const title = e.target.elements.title.value;
        const body = e.target.elements.description.value;
        console.log(creator, "\n", title, "\n", text);

        // fetch('http://127.0.0.1:3000/tickets/uploadFile', {
        //     method: 'POST',
        //     headers: {
        //         Authorization: 'Bearer' + userToken
        //     },
        //     body: JSON.stringify({title, body})
        // }).then(res => res.json())
        // .then(res => console.log(res))
        // .catch(res => console.log(err));

        this.fileUpload(this.state.file)
        .then(res => console.log(res.data))
        .catch(res => console.log(err));

        e.target.elements.creator.value = "";
        e.target.elements.title.value = "";
        e.target.elements.description.value = "";
    }

    onChange(e) {
        this.setState(
            {
                file:e.target.files[0]
            }
        );
    }

    fileUpload(file) {
        const url = ""; //url to upload file to
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return postMessage(url, formData, config);
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
                                    <label>Creator</label>
                                </div>
                                <div className="col span-3-of-4">
                                    <input name="creator" placeholder="Author" type="text" className="addticket-input-creator"/>
                                    <small className="addticket-input-help">Enter your name</small>
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <div className="col span-1-of-4">
                                        <label>Title</label>
                                </div>
                                <div className="col span-3-of-4">
                                    <input name="title" placeholder="Title" type="text" className="addticket-input-title"/>
                                    <small className="addticket-input-help">Describe your issue in a short sentence</small>
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <div className="col span-1-of-4">
                                        <label>Description</label>
                                </div>
                                <div className="col span-3-of-4">
                                    <textarea name="description" placeholder="Content..." type="text" className="addticket-input-description"/>
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <div className="col span-1-of-4">
                                        <label>Attach</label>
                                </div>
                                <div className="col span-3-of-4">
                                    <label for="fileupload" className="addticket-input-attach">Choose File</label>
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
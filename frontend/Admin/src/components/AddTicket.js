import React from 'react';

export default class AddTicket extends React.Component {
    submitTicket(e) {
        e.preventDefault();
        const creator = e.target.elements.creator.value;
        const title = e.target.elements.title.value;
        const text = e.target.elements.description.value;
        console.log(creator, "\n", title, "\n", text);
        fetch('http://127.0.0.1:3000/tickets/:objectId', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({creator, title, text}),
        }).then(res => res.json())
        .then(res => console.log(res))
        .catch(res => console.log(err));
        e.target.elements.creator.value = "";
        e.target.elements.title.value = "";
        e.target.elements.description.value = "";
    }

    render() {
        return (
            <div className="col span-1-of-2">
                <div className="addticket-card">
                    <div className="addticket-card-header">
                            Add Ticket
                    </div>
                    <div className="addticket-card-body">
                    <form onSubmit={this.submitTicket}>
                        <div className="input-wrapper">
                            <div className="col span-1-of-3">
                                <label>Creator</label>
                            </div>
                            <div className="col span-2-of-3">
                                <input name="creator" placeholder="Author" type="text" className="addticket-input-creator"/>
                                <small className="addticket-input-help">Enter your name</small>
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <div className="col span-1-of-3">
                                    <label>Title</label>
                            </div>
                            <div className="col span-2-of-3">
                                <input name="title" placeholder="Title" type="text" className="addticket-input-title"/>
                                <small className="addticket-input-help">Describe your issue in a short sentence</small>
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <div className="col span-1-of-3">
                                    <label>Description</label>
                            </div>
                            <div className="col span-2-of-3">
                                <textarea name="description" placeholder="Content..." type="text" className="addticket-input-description"/>
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <button className="addticket-input-button right" type="submit">Submit</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}
import React from 'react';
import ReactDOM from 'react-dom';

import HeaderAdmin from './components/HeaderAdmin';

class AscendersTicket extends React.Component{
    render() {
        return (
            <div>
                <HeaderAdmin/>
                <Sidenav/>
                <AddTicket/>
            </div>
        );
    }
}

class Sidenav extends React.Component{
    render() {
        return (
            <div className="under-nav-admin row">
                <div className="col span-2-of-7 ticket-wrapper">
                    <button className="input-button" onClick="openForm()">Add Ticket</button>
                </div>
                <div className="col span-3-of-7 preview-wrapper">
                </div>
                <div className="col span-2-of-7 history-wrapper">
                    <p>asdf</p>
                </div>

            </div>
        );
    }
}

class AddTicket extends React.Component{
    render() {
        return (
            <div className="container-ticketSubmission" id="addTicket">
            <form className="container-form-ticketSubmission">
                <label className="container-form-title">Submit a Ticket</label>
                <div className="wrap-input-ticketSubmission">
                    <input className="input-ticketSubmission" type="text" name="ticket-title"></input>
                </div>
                <div className="wrap-input-ticketSubmission">
                    <input className="input-ticketSubmission" type="text" name="ticket-body"></input>
                </div>
                <div className="wrap-input-ticketSubmission">
                    <input className="input-ticketSubmission"></input>
                </div>
                <div className="wrap-input-ticketSubmission">
                    <input className="input-ticketSubmission"></input>
                </div>
                <div className="wrap-input-ticketSubmission">
                    <button className="input-button-ticketSubmission" onClick="closeForm()">Submit</button>
                </div>
            </form>
                
            </div>
        )
    }
}

ReactDOM.render(<AscendersTicket/>,document.getElementById('admin-ticket'));

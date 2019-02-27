import React from 'react';
import ReactDOM from 'react-dom';

import HeaderAdmin from './components/HeaderAdmin';

class AscendersTicket extends React.Component{
    constructor(props){
        super(props);
        this.handleVisibility = this.handleVisibility.bind(this);
        //this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            visibility: false
        };
    };
    handleVisibility(){
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            };
        });
    }
    render() {
        return (
            <div>
                <HeaderAdmin/>
                <Sidenav handleVisibility={this.handleVisibility}/>
                <AddTicket handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

class Sidenav extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.handleVisibility = this.handleVisibility.bind(this);
    // }
    // handleVisibility(){
    //     this.setState((prevState) => {
    //         return { visibility: !prevState.visibility};

    //     })    
    // }
    render() {
        return (
            <div className="under-nav-admin row">
                <div className="col span-2-of-7 ticket-wrapper">
                    <button className="input-button" onClick={this.handleVisibility}>Add Ticket</button>
                </div>
                <div className="col span-3-of-7 preview-wrapper">
                </div>
                <div className="col span-2-of-7 history-wrapper">
                </div>

            </div>
        );
    }
}

class AddTicket extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
    }
    handleAddOption(e){
        e.preventDefault();
        const title = e.target.elements.title.value;
        const body = e.target.elements.body.value;
        const creator = e.target.elements.creator.value;

        e.target.elements.title.value = '';
        e.target.elements.body.value = '';
        e.target.elements.creator.value = '';

    }
    render() {
        return (
            <div className="container-ticketSubmission">
            <form className="container-form-ticketSubmission" onSubmit={this.handleAddOption}>
                <label className="container-form-title">Submit a Ticket</label>
                <div className="wrap-input-ticketSubmission">
                    <input className="input-ticketSubmission" type="text" name="title" placeholder="Title"></input>
                </div>
                <div className="wrap-input-ticketSubmission">
                    <input className="input-ticketSubmission-textarea" type="text" name="body" placeholder="Description"></input>
                </div>
                <div className="wrap-input-ticketSubmission">
                    <textarea rows="4" cols="100" className="input-ticketSubmission" type="text" name="creator" placeholder="Name"></textarea>
                </div>
                <div className="wrap-input-ticketSubmission">
                    <input className="input-ticketSubmission-attachment" type="file" name="attach"></input>
                </div>
                <div className="wrap-input-ticketSubmission">
                    <button className="input-button-ticketSubmission">Submit</button>
                </div>
            </form>
                
            </div>
        )
    }
}

ReactDOM.render(<AscendersTicket/>,document.getElementById('admin-ticket'));

import React from 'react';
import {Link} from 'react-router-dom';
import TicketCard from './CardList.js';

export default class Ticket extends React.Component {
    render() {
        return (
            <div className="ticket-wrapper">
                <div className="ticket-category">
                    <div className="ticket-header ticket-date-submitted col span-1-of-7 no-top no-bottom">
                        <label>Date Submitted</label>
                    </div>
                    <div className="ticket-header ticket-ticket-type col span-1-of-7 no-top no-bottom">
                        <label>Ticket Type</label>
                    </div>
                    <div className="ticket-header ticket-title col span-2-of-7 no-top no-bottom">
                        <label>Title</label>
                    </div>
                    <div className="ticket-header ticket-status col span-1-of-7 no-top no-bottom">
                        <label>Status</label>
                    </div>
                    <div className="ticket-header ticket-ticket-id col span-1-of-7 no-top no-bottom">
                        <label>Ticket Id</label>
                    </div>
                    <div className="ticket-header ticket-action col span-1-of-7 no-top no-bottom">
                        <label>Action</label>
                    </div>
                </div>


                                            {/* <div className="col span-2-of-5 no-top">
                                                <div className="ticket-container">
                                                    <div className="ticket-summary-container">
                                                        <Link to="/admin/tickets/#/unread" className="ticket-summary-unread">
                                                        
                                                            <div className="ticket-summary-unread-number">
                                                                <span className="ticket-summary-number">0</span>
                                                            </div>

                                                            <div className="ticket-summary-unread-label">
                                                                <small>unread</small>
                                                            </div>

                                                        </Link>                       
                                                        <Link to="/admin/tickets/#/all" className="ticket-summary-all">

                                                            <div className="ticket-summary-all-number">
                                                                <span className="ticket-summary-number">1</span>
                                                            </div>

                                                            <div className="ticket-summary-all-label">
                                                                <small className="small">all</small>
                                                            </div>
                                                            
                                                        </Link>
                                                    </div>
                                                    <div className="ticket-list-container">
                                                    
                                                        <TicketCard/>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col span-3-of-5 no-left no-top">
                                                <div className="ticket-preview-container">
                                                
                                                </div>
                                            </div> */}
            </div>
        );
    }
}
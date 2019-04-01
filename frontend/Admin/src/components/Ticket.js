import React from 'react';
import {Link} from 'react-router-dom';

export default class Ticket extends React.Component {
    render() {
        return (
            <div className="ticket-wrapper">
                <div className="col span-2-of-5 no-top">
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
                        
                            <div className="ticket-card">
                                <div className="col span-2-of-3">
                                    <div className="ticket-card-author"><label>branson_admin</label></div>
                                    <div className="ticket-card-title"><small>Feature Demo for PM3</small></div>
                                </div>
                                <div className="col span-1-of-3">
                                    <div className="ticket-card-status">
                                        <a className="badge" data-badge="1">.</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col span-4-of-5 no-left no-top">
                    <div className="ticket-preview-container">
                    
                    </div>
                </div>
            </div>
        );
    }
}
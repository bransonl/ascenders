import React from 'react';
import {Link} from 'react-router-dom';
import CardList from './CardList.js';


class Messages extends React.Component {
    render() {
        return (
            <div className="messages-wrapper">
                <div className="col span-1-of-5 no-top">
                    <div className="messages-container">
                        <div className="messages-summary-container">
                            <Link to="/admin/messages/#/unread" className="messages-summary-unread">
                            
                                <div className="messages-summary-unread-number">
                                    <span className="messages-summary-number">0</span>
                                </div>

                                <div className="messages-summary-unread-label">
                                    <small>unread</small>
                                </div>

                            </Link>                       
                            <Link to="/admin/messages/#/all" className="messages-summary-all">

                                <div className="messages-summary-all-number">
                                    <span className="messages-summary-number">1</span>
                                </div>

                                <div className="messages-summary-all-label">
                                    <small className="small">all</small>
                                </div>
                                
                            </Link>
                        </div>
                        <div className="messages-list-container">
                        
                            <CardList/>

                        </div>
                    </div>
                </div>
                <div className="col span-3-of-5 no-left no-top">
                    <div className="messages-preview-container">
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default Messages;
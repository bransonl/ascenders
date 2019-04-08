import React from 'react';

class ChatCard extends React.Component {
    render() {
        return (
            <div className="messages-card">
                <div className="col span-2-of-3">
                    <div className="messages-card-author"><label>branson_user</label></div>
                    <div className="messages-card-title"><small>Feature Demo</small></div>
                </div>
                <div className="col span-1-of-3">
                    <div className="messages-card-status">
                        <a className="badge" data-badge="1">.</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatCard;
import React from 'react';

class CardList extends React.Component {
    render() {
        return (
            <div className="messages-card">
                <div className="col span-2-of-3">
                    <div className="messages-card-author"><label>branson_admin</label></div>
                    <div className="messages-card-title"><small>Feature Demo for PM3</small></div>
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

export default CardList;
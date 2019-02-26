import React from 'react';
import ReactDOM from 'react-dom';

import HeaderAdmin from './components/HeaderAdmin';

class AscendersTicket extends React.Component{
    render() {
        return (
            <div>
                <HeaderAdmin/>
                <p>test</p>
            </div>
        );
    }
}

ReactDOM.render(<AscendersTicket/>,document.getElementById('admin-ticket'));

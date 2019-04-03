import React from 'react';
import { Admin, Resource } from 'react-admin';

const dataProvider = 'http://127.0.0.1:3000/';
class TicketList extends React.Component {
    render() {
        return (
            <Admin>
                <Resource />

            </Admin>
        );
    }
}

export default TicketList;
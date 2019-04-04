import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import customLayout from './CustomLayout.js';
import { UserList } from './UserList.js';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const TicketList = () => (
            <div className="ticket-wrapper">
                <Admin appLayout={customLayout} dataProvider={dataProvider}>
                    <Resource name="users" list={UserList} />

                </Admin>
            </div>
);

export default TicketList;
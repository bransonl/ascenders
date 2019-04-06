import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import customLayout from './CustomLayout.js';
import { PostList, PostEdit } from './PostList.js';

// const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const dataProvider = `http://127.0.0.1:3000/tickets/user`;
const TicketList = () => (
            <div className="ticket-wrapper">
                <Admin appLayout={customLayout} dataProvider={dataProvider}>
                    <Resource name="posts" list={PostList} edit={PostEdit}/>
                    <Resource name="users" list={ListGuesser} />
                </Admin>
            </div>
);

export default TicketList;
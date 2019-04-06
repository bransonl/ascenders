import { Layout } from 'react-admin';
import React from 'react';
import { Sidebar } from 'react-admin';

const MySidebar = props => <Sidebar 
    {...props} 
    size={0} 
/>;

const CustomLayout = (props) => <Layout
    {...props}
    sidebar={MySidebar}
/>;

export default CustomLayout;

import React from 'react';
import HeaderLogin from './HeaderLogin.js';
import HeaderBanner from './HeaderBanner.js';

export default class AscendersApp extends React.Component{
    render(){
        return (
            <div>
                <HeaderLogin/>
                <HeaderBanner/>
            </div>
        );
    }
}
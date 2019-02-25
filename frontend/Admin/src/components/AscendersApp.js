import React from 'react';
import HeaderNav from './HeaderNav.js'
import HeaderBanner from './HeaderBanner.js'

export default class AscendersApp extends React.Component{
    render(){
        return (
            <div>
                <HeaderNav/>
                <HeaderBanner/>
            </div>
        );
    }
}
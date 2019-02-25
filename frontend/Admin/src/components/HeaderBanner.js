import React from 'react';
import LoginPage from './LoginPage.js'

export default class HeaderBanner extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <section className="heroimage">
                    <div className="bg-overlay">
                      <LoginPage/>
                    </div>
                </section>
            </div>
        );
    }
}
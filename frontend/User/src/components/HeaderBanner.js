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
                        <div className="modern-system">
                            <p className="bg-title">Modern System</p>
                            <p>Cool things here</p>
                        </div>
                        <div className="ticket-support">
                            <p className="bg-title">Ticket Support</p>
                            <p>More cool stuffs here!</p>                        
                        </div>
                        <LoginPage/>
                    </div>
                </section>
            </div>
        );
    }
}


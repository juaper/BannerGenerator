import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class BtnScrollToTop extends Component {

    constructor(props){
        super(props);
        this.state = {
            show : false
        }
    }

    componentDidMount = ()=>{
        window.addEventListener('scroll', this.handleScroll);
    };

    handleScroll = ()=>{
        if(window.pageYOffset > window.innerHeight - window.innerHeight / 2){
            this.setState({show : true})
        }
        else{
            this.setState({show : false})
        }
    };

    scrollToTop = ()=>{
        let currentPosition = window.pageYOffset;
        const interval = setInterval(()=>{
            currentPosition-=20;
            window.scrollTo(200, currentPosition)
            if(currentPosition < 0){
                clearInterval(interval);
            }
        },15)

    };



    render = ()=>{
        const btn = (
            <div className="back-to-top__wrapper">
                <span className="glyphicon glyphicon-chevron-up"/>
            </div>
        );
        return (
            <div className="back-to-top" onClick={this.scrollToTop}>
                {this.state.show ? btn : ''}
            </div>
        );
    }
}

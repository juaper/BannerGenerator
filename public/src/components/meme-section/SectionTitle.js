import React, { Component } from 'react';
import  '../../modules/MaterialClick';
export default class SectionTitle extends Component {

    constructor(props){
        super(props);
    }

    render = ()=>{
        return (
            <h2 className="meme-section-title" onClick={()=> this.props.clickEvent()}>
                {this.props.text}
            </h2>
        );
    }
}

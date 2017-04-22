import React, { Component } from 'react';
import {connect} from 'react-redux';

export class Button extends Component {
    constructor(props){
        super(props);
    }



    render = ()=> {
        const { text,icon , click, style , textStyle} = this.props;
        const className = style ? `flex utils_button ${style}` :  "flex utils_button";
        return (
            <a className={className} onClick={click}>
                {icon ? <span className={icon}/> : null}
                <span className={textStyle}>
                    {text}
                </span>
            </a>
        );
    }
}




function mapStateToProps(state) {
    return {
       canvas : state.canvas
    }
}


export default connect(mapStateToProps)(Button)

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {setCanvas} from '../../actions/index';
export  class Canvas extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount = ()=>{
        const canvas = new fabric.Canvas('c');
        canvas.backgroundColor = '#fff';
        this.props.setCanvas(canvas);
    };

    render() {
        return (
            <div>
                <canvas id='c' />
            </div>
        );
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({ setCanvas }, dispatch)
}

export default connect(null, mapDispatchToProps)(Canvas)
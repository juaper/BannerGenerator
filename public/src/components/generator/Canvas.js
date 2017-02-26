import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {setCanvas} from '../../actions/index';
export  class Canvas extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount = ()=>{
        const canvas = new fabric.Canvas('c',{allowTouchScrolling: true });
        canvas.backgroundColor = '#fff';
        this.props.setCanvas(canvas);

        this.enableWindowScrollOnDrag(canvas)
    };

    enableWindowScrollOnDrag = (canvas)=>{

        canvas.on('mouse:down', function(options) {
            document.querySelector(".generator").style.overflow = 'visible';
            document.querySelector("body").style.overflow = 'visible';

        });
        canvas.on('mouse:up', function(options) {
            document.querySelector(".generator").style.overflow = 'scroll';
            document.querySelector(".body").style.overflow = 'scroll';

        });
    }

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
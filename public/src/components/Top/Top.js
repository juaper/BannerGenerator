import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {generatorDisplayToggle, changeFormat} from '../../actions/index';
import Uploader from '../../containers/Uploader';
export class Top extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    createCleanSlate = ()=>{
        this.props.changeFormat('clean');
        this.props.generatorDisplayToggle(true);
        document.querySelector(".cover").style.display = 'block';

    };


    render= ()=> {
        return (
            <div className="top">
                <img src="./public/images/logo.png"/>
                <h1 className="top__main-title">
                    מחולל הממים - מלך הממים
                </h1>
                <Uploader/>
                <div className="clean-slate-btn" onClick={this.createCleanSlate}> לוח חלק</div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ generatorDisplayToggle , changeFormat}, dispatch)
}

export default connect(null,mapDispatchToProps)(Top)

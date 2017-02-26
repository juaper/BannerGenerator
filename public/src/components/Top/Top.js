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
        const {lang} = this.props;
        const PAGE_TITLE = lang === 'en' ? 'Meme King - Meme Generator' : "מחולל הממים - מלך הממים";
        const CLEANSLATE = lang === 'en' ? 'Clean Board' : "לוח חלק";
        return (
            <div className="top">
                <img src="./public/images/logo.png"/>
                <h1 className="top__main-title">
                    {lang ? PAGE_TITLE : ''}
                </h1>
                <Uploader/>
                <div className="clean-slate-btn" onClick={this.createCleanSlate}> {lang ? CLEANSLATE : ''}</div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
       lang : state.lang
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ generatorDisplayToggle , changeFormat}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Top)

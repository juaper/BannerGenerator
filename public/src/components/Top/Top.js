import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generatorDisplayToggle, changeFormat } from '../../actions/index';
import Uploader from '../../containers/Uploader';
import Searcher from '../../containers/Searcher';
import axios from 'axios';
export class Top extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    createCleanSlate = ()=> {
        this.props.changeFormat('clean');
        this.props.generatorDisplayToggle(true);
        document.querySelector(".cover").style.display = 'block';

    };

    scrollToMemes = ()=> {


        // window.scroll(0,findPos(document.getElementById("meme-sections-container")));
        const wantedPos = findPos(document.getElementById("meme-sections-container"));
        let currentPosition = window.pageYOffset;
        const interval = setInterval(()=> {
            currentPosition += 20;
            if (currentPosition >= wantedPos) {
                clearInteverl(interval);
            }
            window.scrollTo(200, currentPosition)


        }, 15);

        //Finds y value of given object
        function findPos(obj) {
            var curtop = 0;
            if (obj.offsetParent) {
                do {
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
                return [curtop];
            }
        }

    };


    render = ()=> {
        const { lang } = this.props;
        const PAGE_TITLE = lang === 'en' ? 'Meme King - Meme Generator' : "מחולל הממים - מלך הממים";
        const SUB_TITLE = lang === 'en' ? '' : '  הכנת ממים ממגוון ענק, מכל מקום, ובעברית.'
        const CLEANSLATE = lang === 'en' ? 'Clean Board' : "לוח חלק";
        return (
            <div className="top">
                <img src="./public/images/logo.png" />
                <h1 className="top__main-title">
                    {lang ? PAGE_TITLE : ''}
                </h1>
                <h2>
                    {SUB_TITLE}
                </h2>
                <Uploader />
                <div className="clean-slate-btn" onClick={this.createCleanSlate}>
                    <span className="text">{lang ? CLEANSLATE : ''}</span> <span className="glyphicon glyphicon-stop" />
                </div>
                <Searcher />
                <div className="glyphicon glyphicon-menu-down" onClick={this.scrollToMemes} />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        lang: state.lang
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ generatorDisplayToggle, changeFormat }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Top)

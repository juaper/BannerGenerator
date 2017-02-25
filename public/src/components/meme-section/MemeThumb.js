import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generatorDisplayToggle, activeImage } from '../../actions/index';
import LazyLoad from 'react-lazy-load';

export class MemeThumb extends Component {
    constructor(props){
        super(props);
    }

    activateGenerator = ()=> {
        this.props.activeImage([this.getImageSrc('memes')]);
        this.props.generatorDisplayToggle(true);
        document.querySelector('.cover').style.display = 'block'
    };

    getImageSrc = (type)=>{
       return `./public/build-memes/${type}/${this.props.image}`
    };


    render = ()=> {
        const { image } = this.props;
        const src= this.getImageSrc("meme-thumbs");
        return (
            <div className="meme-thumb" src={src} onClick={this.activateGenerator}>
                <LazyLoad  offset={window.innerWidth > 767 ? 100 : 300}>
                    <img src={src} alt={src} className="meme-thumb__img" />
                </LazyLoad>
                <div className="meme-thumb__overlay"></div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ generatorDisplayToggle, activeImage }, dispatch)
}

export default connect(null, mapDispatchToProps)(MemeThumb)
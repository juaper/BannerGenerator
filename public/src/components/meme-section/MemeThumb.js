import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generatorDisplayToggle, activeImage } from '../../actions/index';
import axios from 'axios';
import LazyLoad from 'react-lazy-load';
//import LazyLoad from 'react-lazyload';


export class MemeThumb extends Component {
    constructor(props){
        super(props);
    }

    activateGenerator = ()=> {
        this.props.activeImage([this.getImageSrc('memes')]);
        this.props.generatorDisplayToggle(true);
        document.querySelector('.cover').style.display = 'block';
        this.updateMemeRating();

    };

    updateMemeRating = ()=>{
        const {image} = this.props;
        axios.post('./write-to-firebase',{
            data : image.name
        })
    };

    getImageSrc = (type)=>{
        return `./public/build-memes/${type}/${this.props.image.name }`
    };


    render = ()=> {
        const { image } = this.props;
        const src= this.getImageSrc("meme-thumbs");
        return (
            <div className="meme-thumb" src={src} onClick={this.activateGenerator}>
                {/*<LazyLoad  offset={window.innerWidth > 767 ? 100 : 300} height={window.innerWidth < 767 ? 100 : 160}>*/}
                <img src={src} alt={src} className="meme-thumb__img" />
                {/*</LazyLoad>*/}
                <div className="meme-thumb__overlay">
                    <p className="meme-thumb__description">
                        - מחולל הממים -
                        <br/>
                        {image.rating || ''}
                        {image.description}
                    </p>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ generatorDisplayToggle, activeImage }, dispatch)
}

export default connect(null, mapDispatchToProps)(MemeThumb)
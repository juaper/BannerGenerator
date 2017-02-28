import React, { Component } from 'react';
import MemeThumb from './MemeThumb'
export default class ThumbsGallery extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    renderMemes = ()=>{
        const { data } = this.props;
        let key = Math.random();
        const placeHolder =  <MemeThumb key='soon' image='soon' />;
        return data.map(meme => <MemeThumb key={++key} image={meme} />);

    };

    render= ()=> {
        return (
            <div className="meme-gallery">
                {this.renderMemes()}
            </div>
        );
    }
}

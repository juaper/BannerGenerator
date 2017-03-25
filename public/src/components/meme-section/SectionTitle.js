import React, { Component } from 'react';
import  '../../modules/MaterialClick';
export default class SectionTitle extends Component {

    constructor(props) {
        super(props);
    }

    render = ()=> {
        const { text, icon } = this.props;
        const imageSrc = `./public/build-memes/meme-thumbs/${icon}`
        return (
            <h2 className="meme-section-title" onClick={()=> this.props.clickEvent()}>
                <img src={imageSrc} alt={text}/>
                <span className="text">
                    {text}
                </span>
            </h2>
        );
    }
}

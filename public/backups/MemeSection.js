import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SectionTitle from './SectionTitle';
import ThumbsGallery from './ThumbsGallery';
export default class MemeSection extends Component {
    constructor(props){
        super(props);
        const temp = {fileName : "./public/memes/wonka.jpg"};
        let data ;
        switch(this.props.type){
            case 'popular':
                data  = [temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,];
        }
        this.state = {
            data : data,
            visible : false
        }
    }

    renderMemeGallery = ()=>{
        return this.state.visible ? <ThumbsGallery data={this.state.data} /> : '';
    };

    toggleSection = ()=>{
        this.setState({visible : !this.state.visible})
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({behavior: "smooth",block: 'end'});
    };

    render= ()=> {
        return (
            <div ref={(el) => { this.messagesEnd = el; }}>
                <SectionTitle text={this.props.title} clickEvent={this.toggleSection} />
                {this.renderMemeGallery()}
            </div>
        );
    }
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SectionTitle from './SectionTitle';
import ThumbsGallery from './ThumbsGallery';
export default class MemeSection extends Component {
    constructor(props){
        super(props);

        this.state = {
            visible : false
        }
    }

    renderMemeGallery = ()=>{
        return this.state.visible ? <ThumbsGallery data={this.props.data} /> : '';
    };

    toggleSection = ()=>{
        this.setState({visible : !this.state.visible})
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

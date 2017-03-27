import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SectionTitle from './SectionTitle';
import ThumbsGallery from './ThumbsGallery';
export default class MemeSection extends Component {
    constructor(props){
        super(props);

        this.state = {
            visible : props.open
        }
    }

    renderMemeGallery = ()=>{
        return this.state.visible ? <ThumbsGallery data={this.props.data.slice().reverse()} /> : '';
    };

    toggleSection = ()=>{
        this.setState({visible : !this.state.visible})
    };

    getIcon = ()=>{
        const {data, title} = this.props;
        const limit = data.length - 1;
        const randomNum = Math.floor(Math.random() * (limit  + 1));

        //comes to fix the fact that in the general folder many of the files cannot be found
        if(title === 'כללי'){
            return data[0].name
        }
        return data[randomNum].name
    };

    render= ()=> {
        return (
            <div className="memes-container" ref={(el) => { this.messagesEnd = el; }}>
                <SectionTitle text={this.props.title} clickEvent={this.toggleSection} icon={this.getIcon()} />
                {this.renderMemeGallery()}
            </div>
        );
    }
}

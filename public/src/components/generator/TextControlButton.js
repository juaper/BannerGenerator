import React, { Component } from 'react';

export default class TextControlButton extends Component {
    constructor(props){
        super(props);

    }


    render() {

        const { icon, text } = this.props;
        const className = `${this.props.className} text-control__btn`;
        const myIcon = <span className={icon}/>;
        return (
            <div className={className} onClick={this.props.clickEvent}>
                {icon ? myIcon : text}
            </div>
        );
    }
}

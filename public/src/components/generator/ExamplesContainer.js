import React, { Component } from 'react';
import Slider from 'react-slick'
export default class ExamplesContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalShown : false
        }
    }

    renderExamples = () => {

        return this.props.exampleImages.map(example => <div><img onClick={this.openModal} src={example.url}/> </div>)
    };

    openModal = ()=>{
        this.setState({modalShown : true})
    }


    render = ()=>{

        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const examples = this.renderExamples();
        return (
        <div>
            {examples.length ? <Slider {...settings}>{this.renderExamples()}</Slider> : null }

            <div className="examples_thumbs_container">
            </div>
        </div>

        );
    }
}
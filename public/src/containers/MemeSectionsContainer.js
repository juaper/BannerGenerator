import React, { Component } from 'react';
import { connect } from 'react-redux';
import MemeSection from '../components/meme-section/MemeSection';
import axios from 'axios';
export class MemeSectionsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { sections: [] }
    }


    componentDidMount = ()=> {
        const { data } = this.props;
        const self = this;

        axios.get('./get-popular-memes').then((response)=> {
            const sections = data.map((section)=> {
                return (
                    <MemeSection title={section.type} open={false} type={section.type} data={section.data} />
                )
            });
            const popularSection = <MemeSection open={false} title="טופ 16" type="popular" data={response.data} />;
            self.setState({ sections: [popularSection, ...sections] })

        })


    };


    render = ()=> {

        return (
            <div id="meme-sections-container">
                {this.state.sections}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        data: state.data
    }
}


export default connect(mapStateToProps)(MemeSectionsContainer)
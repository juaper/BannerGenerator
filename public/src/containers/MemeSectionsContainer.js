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
        this.updateSections();
    };

    updateSections = ()=> {
        const { data } = this.props;

        const sections = data.map(({type,data,date})=> <MemeSection title={type} open={false} type={type} data={data.memes} dateUpdated={data.date} />);
        this.setState({ sections: sections });
        this.getPopularSection();
    };

    getPopularSection = ()=> {
        const self = this;
        axios.get('./get-popular-memes').then((response)=> {
            const data = window.innerWidth <= 767 ? response.data.slice(0,30) : response.data;
            const popularSection = (<MemeSection open={false}
                                                 title="הפופולאריים השבוע"
                                                 type="popular"
                                                 data={data.reverse()} />);
            self.setState({ sections: [popularSection, ...self.state.sections] })

        });

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
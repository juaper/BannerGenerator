import React, { Component } from 'react';
import {connect} from 'react-redux';
import MemeSection from '../components/meme-section/MemeSection';
export class MemeSectionsContainer extends Component {
    constructor(props){
        super(props);
        console.log(props)

    }
    renderSection = ()=>{
        const { data } = this.props;
        console.log(data[0],'section container')
        return data.map((section)=>{
            return(
                <MemeSection title={section.type} type={section.type} data={section.data}/>
            )
        })
    };

    render= ()=>{



        return (
            <div>
                {this.renderSection()}
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {
        data : state.data
    }
}



export default connect(mapStateToProps)(MemeSectionsContainer)
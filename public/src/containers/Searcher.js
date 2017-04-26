import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { } from '../actions/index';
import MemeThumb from '../components/meme-section/MemeThumb'
export class Searcher extends Component {
    constructor(props){
        super(props);
        this.state = {
            results : [],
            searchValue : ''
        }
    }

    onChange = (event)=>{
        const value = event.target.value;
        this.setState({searchValue : value});

        if(value.length < 3 || value === ''){
            this.setState({results : []});
            return;
        }


        //analytics
        ga('send', {
            hitType: 'event',
            eventCategory: 'Search',
            eventAction: value,
            eventLabel: 'Search'
        });


        const data = this.props.data;
        const resultMemes = [];

        data.forEach((category) =>{
            category.data.memes.slice().forEach((meme)=>{
                if(meme.description.toLowerCase().includes(value.toLowerCase())){
                    resultMemes.push(meme)
                }
            })

        });

           this.setState({results : resultMemes});

    };


    render = ()=>{
        const {results, searchValue} = this.state;
        const resultsHTML = results.length || searchValue.length < 3 ?  results.map((meme) => <MemeThumb searchValue={searchValue} fromSearch={true} image={meme}/>) : 'No Memes Found';

        const className = searchValue.length > 3 ? 'searcher active' : 'searcher';

        return (
            <div className={className}>
                <div className="search-input-wrapper">
                    <input onChange={this.onChange} placeholder="חיפוש מם" value={this.state.searchValue} />
                    <label className="glyphicon glyphicon-search"/>
                </div>
                    {results.length ? <p className="number_of_memes_found">{`(${results.length})`}</p> : null}
                <div className="results-wrapper">
                    {resultsHTML}
                </div>
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {
        data: state.data,
        lang : state.lang
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Searcher)
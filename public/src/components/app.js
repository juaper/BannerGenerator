import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { setLanguage} from '../actions/index';
import MemeSectionsContainer from '../containers/MemeSectionsContainer';
import Generator from '../containers/Generator';
import Top from './Top/Top';
import BtnScrollToTop from './BtnScrollToTop';
import axios from 'axios';
import Footer from './Footer';
export class App extends Component {

    componentWillMount = ()=>{
        const {setLanguage} = this.props;
        axios.get('https://freegeoip.net/json/').then((response) => {
            if(response.data.country_code === 'IL'){
                setLanguage('he')
            }
            else{
                setLanguage('en')
            }
        })
    };

  render() {
    return (
      <div>
        <Top/>
        <MemeSectionsContainer/>
          <Footer/>
        <Generator/>
        <BtnScrollToTop />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ setLanguage }, dispatch)
}

export default connect(null, mapDispatchToProps)(App)


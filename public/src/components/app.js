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
        // Initialize Firebase
        window.config = {
            apiKey: "AIzaSyA-f4RHZw205unjWdY4jvh_tJ7E1ZVPYKQ",
            authDomain: "memeking-80290.firebaseapp.com",
            databaseURL: "https://memeking-80290.firebaseio.com",
            storageBucket: "gs://memeking-80290.appspot.com", //"memeking-80290.appspot.com",
            messagingSenderId: "243226751545"
        };
        firebase.initializeApp(config);
        const {setLanguage} = this.props;
        setLanguage('he')
        //
        // axios.get('https://freegeoip.net/json/').then((response) => {
        //     if(response.data.country_code === 'IL'){
        //     }
        //     else{
        //         setLanguage('en')
        //     }
        // })
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


import React, { Component } from 'react';
import MemeSectionsContainer from '../containers/MemeSectionsContainer';
import Generator from '../containers/Generator';
import Top from './Top/Top';
import BtnScrollToTop from './BtnScrollToTop';

export default class App extends Component {
  render() {
    return (
      <div>
        <Top/>
        <MemeSectionsContainer/>
        <Generator/>
        <BtnScrollToTop />
      </div>
    );
  }
}



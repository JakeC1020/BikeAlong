import React, { Component } from 'react';
import './App.css';

import Map from './components/Map.js';
import UIOverlay from './components/UIOverlay.js';
import ChildView from './components/ChildView';

class App extends Component {
  render() {
    return (
      <div className="App" style={{height: '100%'}}>
        <Map />
        <UIOverlay />
        <ChildView></ChildView>
      </div>
    );
  }
}

export default App;

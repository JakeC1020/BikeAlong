import React, { Component } from 'react';
import './App.css';

import Map from './components/Map.js';
import UIOverlay from './components/UIOverlay.js';

class App extends Component {
  render() {
    return (
      <div className="App" style={{height: '100%'}}>
        <Map />
        <UIOverlay />
      </div>
    );
  }
}

export default App;

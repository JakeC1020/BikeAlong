import React, { Component } from 'react';
import './App.css';

import Map from './components/Map.js';

class App extends Component {
  render() {
    return (
      <div className="App" style={{height: '100%'}}>
        <Map />
      </div>
    );
  }
}

export default App;

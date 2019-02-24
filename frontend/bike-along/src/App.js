import React, { Component } from 'react';
import './App.css';

import Map from './components/Map.js';
import UIOverlay from './components/UIOverlay.js';
import ChildView from './components/ChildView';

class App extends Component {

  state = {
    isCreating: false,
    waypoints: [],
  }

  toggleIsCreating() {
    this.setState({
      isCreating: !this.state.isCreating,
    });
  }

  pushWaypoint(waypoint) {
    console.log(waypoint);
    this.setState({
      waypoints: new Array(this.state.waypoints.push(waypoint)),
    });
  }

  render() {
    return (
      <div className="App" style={{height: '100%'}}>
        <Map 
          pushWaypoint={waypoint => this.pushWaypoint(waypoint)} 
          waypoints={this.state.waypoints}
        />
        <UIOverlay 
          isCreating={this.state.isCreating} 
          waypoints={this.state.waypoints} 
          toggleIsCreating={() => this.toggleIsCreating()}
        />
        <ChildView></ChildView>
      </div>
    );
  }
}

export default App;

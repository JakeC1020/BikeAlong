import React, { Component } from 'react';
import './App.css';

import Map from './components/Map.js';
import UIOverlay from './components/UIOverlay.js';
import ChildView from './components/ChildView';
import { googleMapsKey } from './secrets';
import axios from 'axios';

class App extends Component {

  state = {
    isCreating: false,
    waypoints: [],
    directions: [],
  }

  toggleIsCreating() {
    if (this.state.directions.length > 0) {
      //fetch
      //axios.post()
    }
    this.setState({
      isCreating: !this.state.isCreating,
    });
  }

  pushWaypoint(waypoint) {
    this.setState({
      waypoints: this.state.waypoints.concat(waypoint),
    });
  }

  setDirections(directions) {
    this.setState({
      directions,
    });
  }

  putRoute() {
    alert('test');
  }

  render() {
    if (window.location.href.slice(-5) === 'child') {
      return(
        <div className="App" style={{height: '100%'}}>
          <ChildView></ChildView>
        </div>
      )
    } 
    else {
      return (
        <div className="App" style={{height: '100%'}}>
          <Map 
            pushWaypoint={waypoint => this.pushWaypoint(waypoint)} 
            waypoints={this.state.waypoints}
            setDirections={directions => this.setDirections(directions)}
          />
          <UIOverlay 
            isCreating={this.state.isCreating} 
            waypoints={this.state.waypoints} 
            toggleIsCreating={() => this.toggleIsCreating()}
            putRoute={() => this.putRoute()}
          />
        </div>
      );
    }
  }
}

export default App;

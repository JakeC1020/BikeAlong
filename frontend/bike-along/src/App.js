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
    directions: null,
  }

  toggleIsCreating() {
    console.log(this.state.directions.routes[0].overview_path);
    const path = this.state.directions.routes[0].overview_path;
    const waypoints = path.map(point => ({lat: point.lat(), lng: point.lng()}));
    console.log('waypoints; ', waypoints);
    console.log('directions: ', this.state.directions);
    if (this.state.directions) {
      axios.post('/routes', {
        waypoints,
      });
      axios.post('/googleroute', {
        data: JSON.stringify(this.state.directions),
      });
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
            directions={this.state.directions}
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

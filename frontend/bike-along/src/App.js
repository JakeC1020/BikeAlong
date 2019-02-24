import React, { Component } from 'react';
import './App.css';

import Map from './components/Map.js';
//import ChildUIOverlay from './components/ChildUIOverlay';
import ParentUIOverlay from './components/ParentUIOverlay';
import ChildView from './components/ChildView';
//import { googleMapsKey } from './secrets';
import axios from 'axios';

class App extends Component {

  state = {
    isCreating: false,
    waypoints: [],
    directions: null,
    isPanicking: false,
    isOOB: false,
  }

  toggleIsCreating() {
    //console.log(this.state.directions.routes[0].overview_path);
    //console.log('waypoints; ', waypoints);
    //console.log('directions: ', this.state.directions);
    if (this.state.waypoints.length > 1) {
      console.log('pnts: ', this.state.waypoints);
      const path = this.state.directions.routes[0].overview_path;
      const waypoints = path.map(point => ({lat: point.lat(), lng: point.lng()}));
      axios.post('/routes', {
        waypoints,
      });
      axios.post('/googleroute', {
        data: JSON.stringify(this.state.directions),
      });
    }
    if(this.state.isCreating || (!this.state.isCreating && this.state.waypoints.length < 2)) {
      this.setState({
        isCreating: !this.state.isCreating,
      });
    }
  }

  setIsPanicking(panicking) {
    this.setState({
      isPanicking: panicking,
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

  setOOB(oob) {
    this.setState({
      isOOB: oob,
    });
  }

  putRoute() {
    alert('test');
  }

  render() {
    console.log(this.state);
    if (window.location.href.slice(-5) === 'child') {
      return(
        <div className="App" style={{height: '100%'}}>
          <ChildView isOOB={this.state.isOOB} setOOB={(oob) => this.setOOB(oob)}></ChildView>
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
            setIsPanicking={panicking => this.setIsPanicking(panicking)}
            setOOB={oob => this.setOOB(oob)}
          />
          <ParentUIOverlay 
            isCreating={this.state.isCreating} 
            waypoints={this.state.waypoints} 
            toggleIsCreating={() => this.toggleIsCreating()}
            putRoute={() => this.putRoute()}
            isPanicking={this.state.isPanicking}
            isOOB={this.state.isOOB}
          />
        </div>
      );
    }
  }
}

export default App;

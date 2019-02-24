import React, { Component } from 'react';
import Geolocation from './GeoLocation';

class ChildView extends Component {

  state = {
    latitude: null,
    longitude: null,
    isPanicking: false,
    error: null,
  };

  updateCoords(lat, lon) {
    this.setState({
      latitude: lat,
      longitude: lon,
    });
  }

  updatePanicking() {
    this.setState({
      isPanicking: !this.state.isPanicking,
    });
  }

  render() {
    return (
      <>
        <Geolocation latitude={this.state.latitude} longitude={this.state.longitude} isPanicking={this.state.isPanicking} updateCoords={(lat, lon) => this.updateCoords(lat, lon)}></Geolocation>
        <PanicButton isPanicking={this.state.isPanicking} updatePanicking={() => this.updatePanicking()}></PanicButton>
      </>
    );
  }
}

export default ChildView;
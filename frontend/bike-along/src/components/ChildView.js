import React, { Component } from 'react';
import Geolocation from './GeoLocation';
import PanicButton from './PanicButton';

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
        <Geolocation latitude={this.state.latitude} longitude={this.state.longitude} isPanicking={this.state.isPanicking} updateCoords={(lat, lng) => this.updateCoords(lat, lng)}></Geolocation>
        <PanicButton isPanicking={this.state.isPanicking} updatePanicking={() => this.updatePanicking()} ></PanicButton>
      </>
    );
  }
}

export default ChildView;
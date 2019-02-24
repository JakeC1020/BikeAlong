import React, { Component } from 'react';
import Geolocation from './GeoLocation';
import PanicButton from './PanicButton';
import Map from '../components/Map';
import Axios from 'axios';

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

  componentDidMount() {
    console.log('child mount');
    Axios.get('/routes')
    .then(res => {
      console.log(res);
    })
    .catch (err => {
      console.log(err);
    })
  }
//<PanicButton isPanicking={this.state.isPanicking} updatePanicking={() => this.updatePanicking()} ></PanicButton>
  render() {
    return (
      <>
        <Geolocation latitude={this.state.latitude} longitude={this.state.longitude} isPanicking={this.state.isPanicking} updateCoords={(lat, lng) => this.updateCoords(lat, lng)}></Geolocation>
        <Map>

        </Map>
      </>
    );
  }
}
;
export default ChildView
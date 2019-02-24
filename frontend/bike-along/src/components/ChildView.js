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
    directions: {},
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
    this.interval = setInterval(() => {
      console.log('intervasl');
      Axios.get('/googleroute')
      .then(res => {
        const data = JSON.parse(res.data.data);
        console.log('SUCCESS');
        console.log(res);
        this.setState({
          directions: data,
        });
        clearInterval(this.interval);
      })
      .catch (err => {
        console.log('fail');
        console.log(err);
      });
    }, 1000);
  }
//<PanicButton isPanicking={this.state.isPanicking} updatePanicking={() => this.updatePanicking()} ></PanicButton>
  render() {
    return (
      <>
        <Geolocation latitude={this.state.latitude} longitude={this.state.longitude} isPanicking={this.state.isPanicking} updateCoords={(lat, lng) => this.updateCoords(lat, lng)}></Geolocation>
        <Map pushWaypoint={() => {}} directions={this.state.directions}>

        </Map>
      </>
    );
  }
}
;
export default ChildView
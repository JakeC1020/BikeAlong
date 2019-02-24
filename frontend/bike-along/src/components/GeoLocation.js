import React, { Component } from 'react';

class Geolocation extends Component {
  sendCoords() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.updateCoords(position.coords.latitude, position.coords.longitude);
        console.log('fetching');
        fetch('http://ASDF/route/status', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            isPanicking: this.props.isPanicking,
          }),
        })
        .then(response => {
          console.log("Response:" + response);
        })
        .catch(error => {
          console.log("Error:" + error);
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentDidMount() {
    this.timer = setInterval(()=> this.sendCoords(), 1000); 
  }

  componentWillUnmount() {
    this.timer = null; // here...
  }

  render() {
    return (
      <>
        <p>Latitude: {this.props.latitude}</p>
        <p>Longitude: {this.props.longitude}</p>
      </>
    );
  }
}

export default Geolocation;

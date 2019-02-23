import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Geolocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  sendCoords() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        fetch('https://SERVERADDRESS/route/status', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }),
        })
        .then(response => {
          console.log("Response:")
          console.log(response);
        })
        .catch(error => {
          console.log("Error:")
          console.log(error);
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentDidMount() {
    this.timer = setInterval(()=> this.getItems(), 1000); 
  }

  componentWillUnmount() {
    this.timer = null; // here...
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
      </View>
    );
  }
}

export default Geolocation;

import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Geolocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  sendCoords() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          error: null,
        });
        this.props.updateCoords(position.coords.latitude, position.coords.longitude);
        console.log('fetching');
        fetch('http://ASDF/route/status', {
          method: 'POST',
          headers: {
            //Accept: 'application/json',
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
      (error) => this.setState({ error: error.message }),
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
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.props.latitude}</Text>
        <Text>Longitude: {this.props.longitude}</Text>
      </View>
    );
  }
}

export default Geolocation;

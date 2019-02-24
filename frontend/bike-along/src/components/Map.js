import React from 'react';
import { compose, withProps } from 'recompose';
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap, 
  Marker,
  DirectionsRenderer,
} from 'react-google-maps';
import axios from 'axios';

import { googleMapsKey } from '../secrets.js';

const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleMapsKey}&libraries=geometry,drawing`;

const boulderCoords = {
  lat: 40.010193,
  lng: -105.242466,
}

const mapStyle = {
  width: '100%',
  height: '100%',
  cursor: 'none !important',
}

const defaultOptions = {
  draggableCursor: 'default',
  disableDefaultUI: true,
  //gestureHandling: 'none',
  zoomControl: false,
  styles: [
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        { visibility: "off" }
      ]
    },
    {
      "featureType": "all",
      "elementType": "all",
      "stylers": [
          {
              "saturation": "32"
          },
          {
              "lightness": "-3"
          },
          {
              "visibility": "on"
          },
          {
              "weight": "1.18"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "landscape.man_made",
      "elementType": "all",
      "stylers": [
          {
              "saturation": "-70"
          },
          {
              "lightness": "14"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "saturation": "100"
          },
          {
              "lightness": "-14"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          },
          {
              "lightness": "12"
          }
      ]
  }
    //{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    //{elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    //{elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    //{
      //featureType: 'administrative.locality',
      //elementType: 'labels.text.fill',
      //stylers: [{color: '#d59563'}]
    //},
    //{
      //featureType: 'poi',
      //elementType: 'labels.text.fill',
      //stylers: [{color: '#d59563'}]
    //},
    //{
      //featureType: 'poi.park',
      //elementType: 'geometry',
      //stylers: [{color: '#263c3f'}]
    //},
    //{
      //featureType: 'poi.park',
      //elementType: 'labels.text.fill',
      //stylers: [{color: '#6b9a76'}]
    //},
    //{
      //featureType: 'road',
      //elementType: 'geometry',
      //stylers: [{color: '#38414e'}]
    //},
    //{
      //featureType: 'road',
      //elementType: 'geometry.stroke',
      //stylers: [{color: '#212a37'}]
    //},
    //{
      //featureType: 'road',
      //elementType: 'labels.text.fill',
      //stylers: [{color: '#9ca5b3'}]
    //},
    //{
      //featureType: 'road.highway',
      //elementType: 'geometry',
      //stylers: [{color: '#746855'}]
    //},
    //{
      //featureType: 'road.highway',
      //elementType: 'geometry.stroke',
      //stylers: [{color: '#1f2835'}]
    //},
    //{
      //featureType: 'road.highway',
      //elementType: 'labels.text.fill',
      //stylers: [{color: '#f3d19c'}]
    //},
    //{
      //featureType: 'transit',
      //elementType: 'geometry',
      //stylers: [{color: '#2f3948'}]
    //},
    //{
      //featureType: 'transit.station',
      //elementType: 'labels.text.fill',
      //stylers: [{color: '#d59563'}]
    //},
    //{
      //featureType: 'water',
      //elementType: 'geometry',
      //stylers: [{color: '#17263c'}]
    //},
    //{
      //featureType: 'water',
      //elementType: 'labels.text.fill',
      //stylers: [{color: '#515c6d'}]
    //},
    //{
      //featureType: 'water',
      //elementType: 'labels.text.stroke',
      //stylers: [{color: '#17263c'}]
    //}
  ]
}

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentLoc: {},
      //directions: {},
    }

    // eslint-disable-next-line
    this.DirectionsService = new google.maps.DirectionsService();
  }

  componentDidMount() {
    //axios.get('/route/status')
    //.then(res => {
      //console.log('test')
      //console.log(res);
    //})
    //.catch(err => {
      //console.log('test2')
      //console.log(err);
    //});

    setInterval(() => {
      //console.log('heartbeat');
      axios.get('/route/status')
      .then(res => {
        //console.log('test');
        //console.log(res);
        console.log(res.data);
        this.setState({
          currentLoc: {
            lat: res.data.latitude,
            lng: res.data.longitude,
          }
        });
        console.log('map props: ', this.props);
        this.props.setOOB(!!res.data.isOffPath);
        this.props.setIsPanicking(res.data.isPanicking);
      })
      .catch(err => {
        console.log('test2')
        console.log(err);
      });

    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.waypoints !== this.props.waypoints) {
      const waypoints = this.props.waypoints;
      const destination = waypoints.length > 1 ? waypoints[waypoints.length-1] : waypoints[0];

      const midWaypoints = waypoints.length > 2 ? waypoints.slice(1, waypoints.length-1).map(waypoint => ({
        location: waypoint,
        stopover: true,
      })) : [];
      
      this.DirectionsService.route({
        origin: waypoints[0],
        destination,
        waypoints: midWaypoints,
        travelMode: 'BICYCLING',
      }, (res, status) => {
        //this.setState({
          //directions: {...res},
        //});
        this.props.setDirections(res);
      });
    }
  }

  mapClick(e) {
  }

  render() {

    console.log('currentLOC: ', this.state.currentLoc);
    // eslint-disable-next-line
    const loc = new google.maps.LatLng(this.state.currentLoc.lat, this.state.currentLoc.lng);
    console.log('LOC', this.state.currentLoc);

    return (
      <GoogleMap
        defaultCenter={boulderCoords}
        defaultOptions={defaultOptions}
        defaultZoom={18}
        zoom={18}
        key={googleMapsKey}
        onClick={e => this.props.pushWaypoint(e.latLng)}
        style={mapStyle}
      >
        <DirectionsRenderer 
          directions={this.props.directions} 
          //preserveViewport={true}
          setOptions={{preserveViewport: true}}
          options={{preserveViewport: true}}
        />
        <Marker position={this.state.currentLoc} />
      </GoogleMap>
    )
  }
}

const ComposedMap = compose(
  withProps({
    googleMapURL: googleMapsUrl,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(Map);

export default ComposedMap;
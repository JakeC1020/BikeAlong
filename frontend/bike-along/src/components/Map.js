import React from 'react';
import { compose, withProps } from 'recompose';
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap, 
  Marker,
  BicyclingLayer,
} from 'react-google-maps';

import { googleMapsKey } from '../secrets.js';

const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleMapsKey}&libraries=geometry,drawing`;

const boulderCoords = {
  lat: 40.010193,
  lng: -105.242466,
}

const Loading = () => (
  <>
    LOADING...
  </>
);

const mapStyle = {
  width: '100%',
  height: '100%',
  cursor: 'none !important',
}

const defaultOptions = {
  draggableCursor: 'default',
  disableDefaultUI: true,
  gestureHandling: 'none',
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
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ]
}

class Map extends React.Component {

  mapClick(e) {
    console.log(e);
  }

  render() {
    return (
      <GoogleMap
        defaultCenter={boulderCoords}
        defaultOptions={defaultOptions}
        defaultZoom={18}
        onClick={e => this.mapClick(e)}
        style={{width: '100%', height: '100%'}}
      >
        <Marker position={boulderCoords} />
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
  withGoogleMap
)(Map);

export default ComposedMap;
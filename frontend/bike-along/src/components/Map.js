import React from 'react';
import { compose, withProps } from 'recompose';
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap, 
  Marker 
} from 'react-google-maps';

const boulderCoords = {
  lat: 40.010193,
  lng: -105.242466,
}

const Loading = () => (
  <>
    LOADING...
  </>
);

//class Map extends React.Component {
  //render() {
    //return (
      //<GoogleMap
        //defaultZoom={8}
        //defaultCenter={boulderCoords}
      //>
        //<Marker position={boulderCoords} />
      //</GoogleMap>
    //)
  //}
//};

//const Map = compose(
  //withProps({
    //googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    //loadingElement: Loading,
  //}),
  //withScriptjs,
  //withGoogleMap
//)(props => (
  //<GoogleMap
    //defaultZoom={8}
    //defaultCenter={boulderCoords}
  //>
    //<Marker position={boulderCoords} />
  //</GoogleMap>

//));

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
);

export default Map;
import { useCallback, useContext, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindowF } from '@react-google-maps/api';

import { JourneysContext } from '../../contexts/journeys-context';

import PlaceCreateDialog from '../place-create-dialog/place-create-dialog';
import PlaceReadDialog from '../place-read-dialog/place-read-dialog';

const containerStyle = {
  width: '100%',
  height: '90%'
};

const center = {
  lat: 40,
  lng: -112
};

const MapEdit = ({ places }) => {

  const { activePlace, setActivePlace } = useContext(JourneysContext);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBi54ehlrrs28I7qEeU1jA6mJKB0If9KkI"
  });

  const [ map, setMap ] = useState(null);

  const onMarkerClick = (place) => {
    if (activePlace && activePlace.id === place.id) {
      return;
    }
    setActivePlace(place);
  }

  useEffect(()=>{
    if(isLoaded){
      const bounds = new window.google.maps.LatLngBounds();
      places?.forEach((place)=>{
        bounds.extend(place.position);
      });
      map?.fitBounds(bounds);
      setMap(map)
    }

    console.log("useEffect");
  },
  [isLoaded, map, places]);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    places?.forEach((place)=>{
      bounds.extend(place.position);
    });
    map.fitBounds(bounds);
    setMap(map)
    
    window.google.maps.event.addListener(map, 'click', function(event) {
      setActivePlace({
        id: 0,
        title: "",
        description: "",
        position: event.latLng.toJSON()
      });
    });
    
    return map;
  }, [places, setActivePlace]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      defaultZoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { activePlace && activePlace.id===0 &&
        <InfoWindowF
          className="InfoWindow"
          onCloseClick={()=> {setActivePlace(null)}}
          position={activePlace.position}
        >
          <PlaceCreateDialog />
        </InfoWindowF>
      }
      {places?.map((place) => (
        <Marker
          key={place.id}
          position={place.position}
          onClick={() => onMarkerClick(place)}
        >
          {activePlace && activePlace.id === place.id ? (
            <InfoWindowF
              onCloseClick={() => setActivePlace(null)}
            >
              <PlaceReadDialog />
            </InfoWindowF>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  ) : <></>
}

export default MapEdit;
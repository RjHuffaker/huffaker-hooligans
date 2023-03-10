import { useCallback, useContext, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindowF } from '@react-google-maps/api';

import { JourneysContext } from '../../contexts/journeys-context';

import PlaceReadDialog from '../place-read-dialog/place-read-dialog';

const containerStyle = {
  width: '100%',
  height: '90%'
};

const center = {
  lat: 40,
  lng: -112
};

const MapView = ({journeys}) => {

  const { activePlace, setActivePlace } = useContext(JourneysContext);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBi54ehlrrs28I7qEeU1jA6mJKB0If9KkI"
  });

  const [map, setMap] = useState(null);

  const onMarkerClick = (journey, place) => {
    if (activePlace?.id === place.id) {
      return;
    }
    setActivePlace(place);
  }

  useEffect(() => {
    if(isLoaded){
      const bounds = new window.google.maps.LatLngBounds();
      const selectedJourneys = journeys?.filter((obj) => obj.selected);
      const filteredJourneys = selectedJourneys?.length ? selectedJourneys : journeys;

      filteredJourneys
        .forEach((journey)=>{
          journey.places.forEach((place)=>{
            bounds.extend(place.position);
          })
        });

      map?.fitBounds(bounds);
      setMap(map)
    }

  }, [isLoaded, journeys, map]);

  const onLoad = useCallback(function callback(map) {
    
    const bounds = new window.google.maps.LatLngBounds();
    journeys?.forEach((journey)=>{
      journey.places.forEach((place)=>{
        bounds.extend(place.position);
      })
    });

    map?.fitBounds(bounds);
    setMap(map);
    
    return map;
  }, [journeys]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
    setActivePlace(null);
  }, [setActivePlace]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      defaultZoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {journeys?.filter((obj) => obj.selected)
        .map((journey) => (
          journey?.places?.map((place) => (
            <Marker
              key={place.id}
              position={place.position}
              onClick={() => onMarkerClick(journey, place)}
            >
              {activePlace?.id === place.id && activePlace?.id!==0 ? (
                <InfoWindowF onCloseClick={() => {setActivePlace(null)}}>
                  <PlaceReadDialog
                    journey={journey}
                    place={place}
                  />
                </InfoWindowF>
              ) : null}
            </Marker>
          ))
        ))
      }
    </GoogleMap>
  ) : <></>
}

export default MapView;
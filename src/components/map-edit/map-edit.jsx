import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindowF } from '@react-google-maps/api';

import ViewPlaceDialog from '../view-place-dialog/view-place-dialog';
import AddPlaceDialog from '../add-place-dialog/add-place-dialog';

import './map-edit.css';

const containerStyle = {
  width: '100%',
  height: '90%'
};

const center = {
  lat: 40,
  lng: -112
};

const MapEdit = ({ journey, setJourney, updateJourney }) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBi54ehlrrs28I7qEeU1jA6mJKB0If9KkI"
  });

  const [map, setMap] = useState(null);

  const [activePlace, setActivePlace] = useState(null);

  const onTitleChange = (event) => {
    setActivePlace((activePlace) => ({
      ...activePlace,
      title: event.target.value
    }));
  }

  const onDescriptionChange = (event) => {
    setActivePlace((activePlace) => ({
      ...activePlace,
      description: event.target.value
    }));
  }

  const onMarkerClick = (place) => {
    if (activePlace && activePlace.id === place.id) {
      return;
    }
    setActivePlace(place);
  }



  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();

    map.fitBounds(bounds);
    setMap(map)

    window.google.maps.event.addListener(map, 'click', function (event) {
      setActivePlace({
        id: 0,
        title: "",
        description: "",
        position: event.latLng.toJSON()
      });
    });

    return map;
  }, []);

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
          <AddPlaceDialog
            activePlace={activePlace}
            onTitleChange={onTitleChange}
            onDescriptionChange={onDescriptionChange}
          />
        </InfoWindowF>
      }
      {journey?.places?.map((place) => (
        <Marker
          key={place.id}
          position={place.position}
          onClick={() => onMarkerClick(place)}
        >
          {activePlace?.id === place.id ? (
            <InfoWindowF
              onCloseClick={() => setActivePlace(null)}
            >
              <ViewPlaceDialog
                activePlace={activePlace}
              />
            </InfoWindowF>
          ) : null}
        </Marker>
      ))
      }
    </GoogleMap>
  ) : <></>
}

export default MapEdit;
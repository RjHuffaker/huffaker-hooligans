import { useState, useCallback, useContext } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindowF } from '@react-google-maps/api';

import { UserContext } from '../../contexts/user-context';

import AddPlaceDialog from '../add-place-dialog/add-place-dialog';
import ViewPlaceDialog from '../view-place-dialog/view-place-dialog';

import './map-container.css';

const containerStyle = {
  width: '100%',
  height: '90%'
};

const center = {
  lat: 40,
  lng: -112
};

const MapContainer = ({places, activePlace, setActivePlace, onPlaceSubmit, onPlaceUpdate, onPlaceDelete}) => {
  
  const { currentUser } = useContext(UserContext);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBi54ehlrrs28I7qEeU1jA6mJKB0If9KkI"
  });

  const [map, setMap] = useState(null);

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

  const onSaveClick = () => {
    onPlaceUpdate(activePlace);
  }

  const deletePlace = (place) => {
    setActivePlace(null);
    onPlaceDelete(place);
  }

  const submitNewPlace = () => {
    setActivePlace(null);
    onPlaceSubmit(activePlace);
  }

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    places?.map((place)=>{
      return bounds.extend(place.position);
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
  }, [places, currentUser]);

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
            submitNewPlace={submitNewPlace}
          />
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
              <ViewPlaceDialog
                activePlace={activePlace}
                onTitleChange={onTitleChange}
                onDescriptionChange={onDescriptionChange}
                onSaveClick={onSaveClick}
                onDeleteClick={deletePlace}
              />
            </InfoWindowF>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  ) : <></>
}

export default MapContainer;
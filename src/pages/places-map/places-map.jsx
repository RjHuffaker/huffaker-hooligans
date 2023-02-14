import { useContext } from 'react';
import MapContainer from '../../components/map-container/map-container';

import { PlacesContext } from '../../contexts/places-context';

function PlacesMap() {

  const { places, createPlace, updatePlace, deletePlace } = useContext(PlacesContext);

  const onPlaceSubmit = (place) => {
    createPlace(place);
  }

  const onPlaceUpdate = (place) => {
    updatePlace(place);
  }

  const onPlaceDelete = (place) => {
    deletePlace(place);
  }

  return (
    <div className="flex flex-column items-center" style={{height: '600px', border: '1px solid black'}}>
      <MapContainer
        places={places}
        onPlaceSubmit={onPlaceSubmit}
        onPlaceUpdate={onPlaceUpdate}
        onPlaceDelete={onPlaceDelete}
      />
    </div>
  );
}

export default PlacesMap;
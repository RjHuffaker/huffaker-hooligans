import { useContext, useState } from 'react';

import { JourneysContext } from '../../contexts/journeys-context';

import EditableList from '../editable-list/editable-list';

const PlaceList = () => {
  const {
    selectedJourney,
    setSelectedJourney,
    updateJourney
  } = useContext(JourneysContext);

  const [ editablePlace, setEditablePlace ] = useState(null);
  const [ selectedPlace, setSelectedPlace ] = useState(null);

  const onChangeTitle = (event) => {
    setEditablePlace({...editablePlace, title: event.target.value});
  }

  const onPlaceSave = () => {
    let newJourney = selectedJourney;
    const index = newJourney.places.findIndex(obj => obj.id === editablePlace.id);
    newJourney.places[index] = editablePlace;
    updateJourney(newJourney);
    setSelectedJourney(newJourney);
    setEditablePlace(null);
  }

  const onPlaceRemove = () => {
    let newJourney = selectedJourney;
    newJourney.places = newJourney.places.filter((obj) => obj.id !== editablePlace.id);
    updateJourney(newJourney);
    setSelectedPlace(null);
    setEditablePlace(null);
  }

  return (
    <>
      <h3>Places</h3>
      <EditableList 
        itemList = {selectedJourney?.places}
        selectedItem = {selectedPlace}
        setSelectedItem = {setSelectedPlace}
        editableItem = {editablePlace}
        setEditableItem = {setEditablePlace}
        onChangeTitle = {onChangeTitle}
        onItemSave = {onPlaceSave}
        onItemRemove = {onPlaceRemove}
      />
    </>
  );
}

export default PlaceList;
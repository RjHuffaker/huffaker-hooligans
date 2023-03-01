import { useContext, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { JourneysContext } from '../../contexts/journeys-context'; 

import EditableList from '../editable-list/editable-list';

const blankJourney = {
  title: "",
  places: []
}

const JourneyList = () => {
  
  const {
    journeys,
    createJourney,
    updateJourney,
    deleteJourney,
    selectedJourney,
    setSelectedJourney
  } = useContext(JourneysContext);

  const [ editableJourney, setEditableJourney ] = useState(null);

  const onJourneySave = () => {
    updateJourney(editableJourney);
    setEditableJourney(null);
  }

  const onJourneyRemove = () => {
    deleteJourney(selectedJourney);
    setSelectedJourney(null);
    setEditableJourney(null);
  }

  const addBlankJourney = () => {
    createJourney(blankJourney)
      .then(response => {
        setSelectedJourney(response);
        setEditableJourney(response);
      });
  }

  const onChangeTitle = (event) => {
    setEditableJourney({...editableJourney, title: event.target.value});
  }

  return (
    <>
      <EditableList 
        itemList = {journeys}
        selectedItem = {selectedJourney}
        setSelectedItem = {setSelectedJourney}
        editableItem = {editableJourney}
        setEditableItem = {setEditableJourney}
        onChangeTitle = {onChangeTitle}
        onItemSave = {onJourneySave}
        onItemRemove = {onJourneyRemove}
      />
      <Row className="my-2 p-2">
        <Button
          onClick={addBlankJourney}
        >
          Add New Journey
        </Button>
      </Row>
    </>
  );
}

export default JourneyList;
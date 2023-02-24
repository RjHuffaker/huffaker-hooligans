import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { JourneysContext } from '../../contexts/journeys-context'; 

import './journey-list.css';

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
    setSelectedJourney,
    editableJourney,
    setEditableJourney
  } = useContext(JourneysContext);

  const onJourneySelect = (journey) => {
    if(journey.id === selectedJourney?.id){
      setEditableJourney(journey);
    } else {
      setSelectedJourney(journey);
      setEditableJourney(null);
    }
  }

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
      .then(res => {
        setSelectedJourney(res);
        setEditableJourney(res);
      });
  }

  const onChangeTitle = (event) => {
    setEditableJourney({...editableJourney, title: event.target.value});
  }

  return (
    <>
      <h3>Journeys</h3>
      <ListGroup>
        {journeys?.map(journey => (
          <div key={journey.id}>
            {journey.id === editableJourney?.id ?
              <ButtonGroup className="w-100 journey-row">
                <input
                  className="form-control"
                  value={editableJourney.title}
                  onChange={onChangeTitle}
                />
                <Button variant="outline-success" onClick={onJourneySave}>&#9998;</Button>
                <Button variant="outline-danger" onClick={onJourneyRemove}>&#128465;</Button>
              </ButtonGroup>
              :
              <ListGroup.Item
                className="journey-row"
                variant="light"
                action
                onClick={() => onJourneySelect(journey)}
                active={journey.id === selectedJourney?.id}
              >
                {journey.title}
              </ListGroup.Item>
            }
          </div>
        ))}
      </ListGroup>
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
import { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { JourneysContext } from '../../contexts/journeys-context'; 

import MapContainer from '../../components/map-container/map-container';

const defaultJourney = {
  title: "",
  places: []
}

const JourneysMap = () => {
  const { journeys, setJourneys, createJourney, updateJourney, deleteJourney } = useContext(JourneysContext);

  const [ currentJourney, setCurrentJourney ] = useState({});

  const [ newJourney, setNewJourney ] = useState(defaultJourney);

  const onPlaceSubmit = (place) => {
    place.id = place?.position.lat.toString() + place?.position.lng.toString();
    currentJourney.places.push(place);
    updateJourney(currentJourney);
  }

  const onPlaceUpdate = (place) => {
    const index = currentJourney.places.findIndex(obj => obj.id === place.id);
    if (index !== -1) {
      currentJourney.places[index] = place;
    }
    updateJourney(currentJourney);
  }

  const onPlaceDelete = (place) => {
    const newPlaces = currentJourney.places.filter((obj) => obj.id !== place.id);
    const newJourney = {...currentJourney, places: newPlaces};
    setCurrentJourney(newJourney);

    console.log(newJourney);
    updateJourney(newJourney);
  }

  const onJourneyClick = (journey) => {
    setCurrentJourney(journey);
  }

  const onTitleChange = (event) => {
    setNewJourney({...newJourney, title: event.target.value})
  }

  const addJourney = (journey) => {
    createJourney(journey);
  }

  return (
    <Container className="h-75">
      <Row className="h-100">
        <Col md={9}>
          <MapContainer
            places={currentJourney?.places}
            onPlaceSubmit={onPlaceSubmit}
            onPlaceUpdate={onPlaceUpdate}
            onPlaceDelete={onPlaceDelete}
          />
        </Col>
        <Col md={3}>
          <h3>Journeys</h3>
          <ListGroup>
            {journeys?.map(journey => (
              <ListGroup.Item
                key={journey.id}
                onClick={() => onJourneyClick(journey)}
                active={
                  journey.id === currentJourney.id
                }
              >
                {journey.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
          
          <div>
            <input
              className="form-control"
              value={newJourney.title}
              onChange={onTitleChange}
            />
            <Button
              onClick={() => addJourney(newJourney)}
            >Add Journey</Button>
          </div>

        </Col>
      </Row>
    </Container>
  );
}

export default JourneysMap;
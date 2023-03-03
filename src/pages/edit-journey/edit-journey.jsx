import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import MapContainer from '../../components/map-container/map-container';

import { JourneysContext } from '../../contexts/journeys-context';

const EditJourney = () => {
  const {
    readJourney,
    updateJourney
  } = useContext(JourneysContext);

  const [ journey, setJourney ] = useState(null);

  const [ activePlace, setActivePlace ] = useState(null);

  const { journeyId } = useParams();

  useEffect(() => {
    const fetchJourney = async () => {
      const response = await readJourney(journeyId);
      setJourney(response);
    }

    fetchJourney();
  }, [readJourney, journeyId]);


  const onPlaceSubmit = (place) => {
    place.id = place?.position.lat.toString() + place?.position.lng.toString();
    journey.places.push(place);
    updateJourney(journey);
  }

  const onPlaceUpdate = (place) => {
    const index = journey.places.findIndex(obj => obj.id === place.id);
    if (index !== -1) {
      journey.places[index] = place;
    }
    updateJourney(journey);
  }

  const onPlaceDelete = (place) => {
    const newPlaces = journey.places.filter((obj) => obj.id !== place.id);
    const newJourney = { ...journey, places: newPlaces };
    setJourney(newJourney);
    updateJourney(newJourney);
  }



  return (
    <Container className="h-75">
      <Row className="h-100">
        <Col xs={3}>
          <ListGroup>
            {journey?.places.map((place) =>
                <ListGroup.Item
                  key={place.id}
                  variant="light"
                  action
                  active={place.id === activePlace?.id}
                  onClick={() => setActivePlace(place)}
                >
                  <Row>
                    <Col>
                      {place.title}
                    </Col>
                    <Col xs={2}>
                      <span variant="outline-success" onClick={() => onPlaceUpdate(place.id)}>&#9998;</span>
                    </Col>
                  </Row>
                </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col xs={9} className="h-100">
          <MapContainer
            places={journey?.places}
            activePlace={activePlace}
            setActivePlace={setActivePlace}
            onPlaceSubmit={onPlaceSubmit}
            onPlaceUpdate={onPlaceUpdate}
            onPlaceDelete={onPlaceDelete}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EditJourney;
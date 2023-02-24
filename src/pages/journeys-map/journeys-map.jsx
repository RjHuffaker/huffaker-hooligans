import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { JourneysContext } from '../../contexts/journeys-context';

import MapContainer from '../../components/map-container/map-container';
import JourneyList from '../../components/journey-list/journey-list';

import './journeys-map.css';

const JourneysMap = () => {

  const {
    updateJourney,
    selectedJourney,
    setSelectedJourney
  } = useContext(JourneysContext);

  const onPlaceSubmit = (place) => {
    place.id = place?.position.lat.toString() + place?.position.lng.toString();
    selectedJourney.places.push(place);
    updateJourney(selectedJourney);
  }

  const onPlaceUpdate = (place) => {
    const index = selectedJourney.places.findIndex(obj => obj.id === place.id);
    if (index !== -1) {
      selectedJourney.places[index] = place;
    }
    updateJourney(selectedJourney);
  }

  const onPlaceDelete = (place) => {
    const newPlaces = selectedJourney.places.filter((obj) => obj.id !== place.id);
    const newJourney = { ...selectedJourney, places: newPlaces };
    setSelectedJourney(newJourney);
    updateJourney(newJourney);
  }

  return (
    <Container className="h-75">
      <Row className="h-100">
        <Col md={8}>
          <MapContainer
            places={selectedJourney?.places}
            onPlaceSubmit={onPlaceSubmit}
            onPlaceUpdate={onPlaceUpdate}
            onPlaceDelete={onPlaceDelete}
          />
        </Col>
        <Col md={4}>
          <JourneyList />
        </Col>
      </Row>
    </Container>
  );
}

export default JourneysMap;
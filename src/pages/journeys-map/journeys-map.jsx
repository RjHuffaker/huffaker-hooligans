import { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { JourneysContext } from '../../contexts/journeys-context';

import PlaceList from '../../components/place-list/place-list';
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


  const [showJourneys, setShowJourneys] = useState(false);
  const [showPlaces, setShowPlaces] = useState(false);

  const handleCloseJourneys = () => setShowJourneys(false);
  const handleClosePlaces = () => setShowPlaces(false);
  const handleShowJourneys = () => setShowJourneys(true);
  const handleShowPlaces = () => setShowPlaces(true);

  return (
    <Container className="h-75">
      <Row className="h-100">
        <Col md={12}>
          <MapContainer
            places={selectedJourney?.places}
            onPlaceSubmit={onPlaceSubmit}
            onPlaceUpdate={onPlaceUpdate}
            onPlaceDelete={onPlaceDelete}
          />
          <Row>
            <Col></Col>
            <Col>
              {showJourneys ? 
              <Button className="w-50" variant="primary" onClick={handleCloseJourneys}>
                Hide Journeys
              </Button> : 
              <Button className="w-50" variant="primary" onClick={handleShowJourneys}>
                Show Journeys
              </Button>}
              {showPlaces ?
              <Button className="w-50" variant="primary" onClick={handleClosePlaces}>
                Hide Places
              </Button> : 
              <Button className="w-50" variant="primary" onClick={handleShowPlaces}>
                Show Places
              </Button>}

            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>

      

      <Offcanvas show={showJourneys} placement={"start"} backdrop={false} onHide={handleCloseJourneys}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <JourneyList />
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={showPlaces} placement={"end"} backdrop={false} onHide={handleClosePlaces}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <PlaceList />
        </Offcanvas.Body>
      </Offcanvas>

    </Container>
  );
}

export default JourneysMap;
import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
    <Container className="h-75">
      <Row className="h-100">
        <Col className="h-100">
          <MapContainer
            places={places}
            onPlaceSubmit={onPlaceSubmit}
            onPlaceUpdate={onPlaceUpdate}
            onPlaceDelete={onPlaceDelete}
          /> 
        </Col>
      </Row>
    </Container>
  );
}

export default PlacesMap;
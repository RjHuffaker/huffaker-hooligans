import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { UserContext } from '../../contexts/user-context';
import { JourneysContext } from '../../contexts/journeys-context';

import PlaceEditModal from '../../components/place-edit-modal/place-edit-modal';

const PlaceReadDialog = ({ journey, place }) => {
  
  const { currentUser } = useContext(UserContext);

  return (
    <div className="InfoWindow" key={place.id}>
      <Container>
        <Row>
          <Col>
            <h3>{place.title} {currentUser &&
              <PlaceEditModal
                journey={journey}
                place={place}
              />
            }</h3>
          </Col>
        </Row>
        <Row className="my-3">
          <p>{place.description}</p>
        </Row>
        <Row>
          <Col>
            {new Date(place.arrivalDate).toLocaleDateString()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PlaceReadDialog;
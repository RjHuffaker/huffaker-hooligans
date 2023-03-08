import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { UserContext } from '../../contexts/user-context';
import { JourneysContext } from '../../contexts/journeys-context';

import PlaceEditModal from '../../components/place-edit-modal/place-edit-modal';

const PlaceReadDialog = () => {
  
  const { currentUser } = useContext(UserContext);

  const { activePlace } = useContext(JourneysContext);

  return (
    <div className="InfoWindow" key={activePlace.id}>
      <Container>
        <Row>
          <Col>
            <h3>{activePlace.title} {currentUser && <PlaceEditModal />}</h3>
          </Col>
        </Row>
        <Row className="my-3">
          <p>{activePlace.description}</p>
        </Row>
        <Row>
          <Col>
            {new Date(activePlace.arrivalDate).toLocaleDateString()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PlaceReadDialog;
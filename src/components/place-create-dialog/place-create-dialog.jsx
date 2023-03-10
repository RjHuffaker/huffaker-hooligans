import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { JourneysContext } from '../../contexts/journeys-context';

import PlaceEditModal from '../place-edit-modal/place-edit-modal';

const PlaceCreateDialog = ({ journey }) => {
  
  const { activePlace } = useContext(JourneysContext);

	return(
		<Container className="InfoWindow">
      <Row>
        <span>{activePlace.position.lat}, {activePlace.position.lng}</span>
      </Row>
      <Row>
        <PlaceEditModal
          journey={journey}
          modalHeader={"Create New Place"}
          buttonText={"Create New Place"}
          variant="success"
        />
      </Row>
    </Container>
	)
}

export default PlaceCreateDialog;
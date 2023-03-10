import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { JourneysContext } from '../../contexts/journeys-context';

import PlaceEditModal from '../place-edit-modal/place-edit-modal';

const PlaceCreateDialog = ({ journey }) => {
	return(
		<Container className="InfoWindow">
      <Row>
        <h3>Add Place</h3>
      </Row>
      <Row>
        <PlaceEditModal journey={journey}>
          <Button className="success">Create New Place</Button>
        </PlaceEditModal>
      </Row>
    </Container>
	)
}

export default PlaceCreateDialog;
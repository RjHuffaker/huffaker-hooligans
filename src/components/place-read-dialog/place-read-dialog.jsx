import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { UserContext } from '../../contexts/user-context';

import PlaceEditModal from '../../components/place-edit-modal/place-edit-modal';

const PlaceReadDialog = ({activePlace, onTitleChange, onDescriptionChange, onSaveClick, onDeleteClick}) => {
  
  const { currentUser } = useContext(UserContext);

  return (
    <div className="InfoWindow" key={activePlace.id}>
      <Container>
        <Row>
          <Col>
            <h3>{activePlace.title}</h3>
          </Col>
        </Row>
        <Row className="my-3">
          <p>{activePlace.description}</p>
        </Row>
        {currentUser && 
          <Row>
            <Col>
              <PlaceEditModal
                place={activePlace}
                onTitleChange={onTitleChange}
                onDescriptionChange={onDescriptionChange}
                onSaveClick={onSaveClick}
                onDeleteClick={onDeleteClick}
              />
            </Col>
          </Row>
        }
      </Container>
    </div>
  );
}

export default PlaceReadDialog;
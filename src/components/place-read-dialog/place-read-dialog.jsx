import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { UserContext } from '../../contexts/user-context'; 

const PlaceReadDialog = ({activePlace, setEditMode}) => {
  
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
              <Button variant="outline-primary" onClick={() => {setEditMode(true)}}>&#9998;</Button>
            </Col>
          </Row>
        }
      </Container>
    </div>
  );
}

export default PlaceReadDialog;
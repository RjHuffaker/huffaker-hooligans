import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { UserContext } from '../../contexts/user-context';
import { JourneysContext } from '../../contexts/journeys-context';

import PlaceEditModal from '../../components/place-edit-modal/place-edit-modal';
import ImageCarousel from "../../components/image-carousel/image-carousel";

import "./place-read-dialog.css";

const PlaceReadDialog = ({ journey }) => {
  
  const { currentUser } = useContext(UserContext);

  const { activePlace } = useContext(JourneysContext);

  return (
    <div className="InfoWindow" key={activePlace.id}>
      <Container>
        <Row>
          <Col>-
            <h4>{activePlace.title} {currentUser &&
              <PlaceEditModal
                journey={journey}
                modalHeader={"Edit Place"}
                buttonText="&#9998;"
                variant="light"
                className="text-primary py-0"
                style={{"fontSize":"16pt"}}
              />
            }</h4>
          </Col>
        </Row>
        <Row>
          {activePlace.images &&
            <ImageCarousel slideList={activePlace.images} />
          }
        </Row>
        <Row className="my-2">
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
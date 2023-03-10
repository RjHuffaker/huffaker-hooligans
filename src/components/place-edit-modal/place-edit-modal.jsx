import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { JourneysContext } from '../../contexts/journeys-context';

import DateSelector from '../date-selector/date-selector';
import DeleteModalButton from '../../components/delete-modal-button/delete-modal-button';

const PlaceEditModal = ({ children, journey }) => {
  
  const {
    activePlace,
    setActivePlace,
    updateJourney
  } = useContext(JourneysContext);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivePlace({ ...activePlace, [name]: value })
  }

  const onArrivalDateChange = (date) => {
    setActivePlace({ ...activePlace, arrivalDate: date.getTime() });
  }

  const onPlaceUpdate = (place) => {
    if(place.id){
      const index = journey.places.findIndex(obj => obj.id === place.id);
      if (index !== -1) {
        journey.places[index] = place;
      }
    } else {
      place.id = place?.position.lat.toString() + place?.position.lng.toString();
      journey.places.push(place);
    }
    updateJourney(journey);
    setActivePlace(null);
  }

  const onPlaceDelete = (place) => {
    journey.places = journey.places.filter((obj) => obj.id !== place.id);
    updateJourney(journey);
  }

  return (
    <>
      <span onClick={handleShow}>{children}</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Place</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <label htmlFor="place-title">Title</label>
              <input
                className="form-control"
                name="title"
                type="text"
                value={activePlace?.title}
                onChange={handleChange}
              />
            </Row>
            <Row>
              <label htmlFor="place-description">Description</label>
              <textarea
                className="form-control"
                name="description"
                type="text"
                value={activePlace?.description}
                onChange={handleChange}
              />
            </Row>
            <Row>
              <DateSelector
                labelText={"Arrival Date:"}
                date={activePlace?.arrivalDate}
                setDate={onArrivalDateChange}
              />
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button variant="outline-success" onClick={()=>{onPlaceUpdate(activePlace); handleClose()}}>&#x2714;</Button>
              <DeleteModalButton deleteObject={activePlace} deleteAction={() => onPlaceDelete(activePlace)}>&#128465;</DeleteModalButton>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PlaceEditModal;
import { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { JourneysContext } from '../../contexts/journeys-context';

import DeleteModalButton from '../../components/delete-modal-button/delete-modal-button';

const PlaceEditModal = () => {
  
  const {
    activePlace,
    setActivePlace,
    activeJourney,
    setActiveJourney,
    updateJourney
  } = useContext(JourneysContext);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onTitleChange = (event) => {
    setActivePlace((activePlace) => ({
      ...activePlace,
      title: event.target.value
    }));
  }

  const onDescriptionChange = (event) => {
    const value = event.target.value;
    setActivePlace((activePlace) => ({
      ...activePlace,
      description: event.target.value
    }));
  }

  const onStartDateChange = (date) => {
    setActivePlace({ ...activePlace, startDate: date.getTime() });
  }

  const onPlaceUpdate = (place) => {
    const index = activeJourney.places.findIndex(obj => obj.id === place.id);
    if (index !== -1) {
      activeJourney.places[index] = place;
    }
    updateJourney(activeJourney);
    setActivePlace(null);
  }

  const onPlaceDelete = (place) => {
    const newPlaces = activeJourney.places.filter((obj) => obj.id !== place.id);
    const newJourney = { ...activeJourney, places: newPlaces };
    setActiveJourney(newJourney);
    updateJourney(newJourney);
  }

  return (
    <>
      <span className="text-primary" onClick={handleShow}>&#9998;</span>

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
                id="place-title"
                name="place-title"
                type="text"
                value={activePlace?.title}
                onChange={onTitleChange}
              />
            </Row>
            <Row>
              <label htmlFor="place-description">Description</label>
              <textarea
                className="form-control"
                id="place-description"
                name="place-description"
                type="text"
                value={activePlace?.description}
                onChange={onDescriptionChange}
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
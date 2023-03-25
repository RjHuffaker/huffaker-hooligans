import { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { JourneysContext } from '../../contexts/journeys-context';
import { ImagesContext } from '../../contexts/images-context';

import DateSelector from '../date-selector/date-selector';

import ImageSelectModal from '../../components/image-select-modal/image-select-modal';
import DeleteModalButton from '../../components/delete-modal-button/delete-modal-button';

const PlaceEditModal = ({ journey, modalHeader, buttonText, ...otherProps }) => {
  
  const {
    activePlace,
    setActivePlace,
    updateJourney
  } = useContext(JourneysContext);

  const {
		stageImage,
		stagedImages,
		uploadImage,
		uploadPercent,
		createImageData
	} = useContext(ImagesContext);
  
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

  const setTitleImage = (value) => {
    setActivePlace({ ...activePlace, titleImage: value });
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

  const handleAccept = async (newImageData) => {
    let images = activePlace.images ? activePlace.images : [];
    images.push(newImageData);
    setActivePlace({ ...activePlace, images: [...images] });
  }

  return (
    <>
      <Button {...otherProps} onClick={handleShow}>{buttonText}</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <label htmlFor="place-title">Title</label>
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <input
                  className="form-control"
                  name="title"
                  type="text"
                  value={activePlace?.title}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <label htmlFor="place-description">Description</label>
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <textarea
                  className="form-control"
                  name="description"
                  type="text"
                  value={activePlace?.description}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <DateSelector
              labelText={"Arrival Date:"}
              date={activePlace?.arrivalDate}
              setDate={onArrivalDateChange}
            />
            <ImageSelectModal
							handleAccept={handleAccept}
						/>
            
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
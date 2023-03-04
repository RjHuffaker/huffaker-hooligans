import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import MapEdit from '../../components/map-edit/map-edit';

import { JourneysContext } from '../../contexts/journeys-context';

const EditJourney = () => {
  const {
    readJourney,
    updateJourney
  } = useContext(JourneysContext);

  const [ journey, setJourney ] = useState(null);

  const [ activePlace, setActivePlace ] = useState(null);

  const { journeyId } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchJourney = async () => {
      const response = await readJourney(journeyId);
      setJourney(response);
    }

    fetchJourney();
  }, [readJourney, journeyId]);


  const onPlaceSubmit = (place) => {
    place.id = place?.position.lat.toString() + place?.position.lng.toString();
    journey.places.push(place);
    updateJourney(journey);
  }

  const onPlaceUpdate = (place) => {
    const index = journey.places.findIndex(obj => obj.id === place.id);
    if (index !== -1) {
      journey.places[index] = place;
    }
    updateJourney(journey);
  }

  const onPlaceDelete = (place) => {
    const newPlaces = journey.places.filter((obj) => obj.id !== place.id);
    const newJourney = { ...journey, places: newPlaces };
    setJourney(newJourney);
    updateJourney(newJourney);
  }

  const onChangeTitle = (event) => {
    const newTitle = event.target.value;
    setJourney({...journey, title: newTitle});
  }

  return (
    <Container className="h-75">
      <Row className="m-1">
        <Col>
        <input
            className="ms-auto form-control"
            value={journey?.title}
            onChange={onChangeTitle}
          />
        </Col>
        <Col>
          <Button variant="primary" className="float-end d-lg-none" onClick={handleShow}>
            Show/Hide Places
          </Button>
        </Col>
      </Row>

      <Row className="h-100">
        
        <Col lg={3} style={{"overflowY":"scroll", height: "100%"}} className="d-xl-block d-lg-block d-md-none d-sm-none d-none">
          
          <Offcanvas show={show} onHide={handleClose} responsive="lg">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Show/Hide Places</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ListGroup>
                {journey?.places.map((place) =>
                    <ListGroup.Item
                      key={place.id}
                      variant="light"
                      action
                      active={place.id === activePlace?.id}
                      onClick={() => setActivePlace(place)}
                    >
                      <Row>
                        <Col>
                          {place.title}
                        </Col>
                        <Col xs={2}>
                          <span variant="outline-success" onClick={() => onPlaceUpdate(place.id)}>&#9998;</span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                )}
              </ListGroup>

            </Offcanvas.Body>
          </Offcanvas>

        </Col>










        <Col lg={9} md={12} className="h-100">
          <MapEdit
            places={journey?.places}
            activePlace={activePlace}
            setActivePlace={setActivePlace}
            onPlaceSubmit={onPlaceSubmit}
            onPlaceUpdate={onPlaceUpdate}
            onPlaceDelete={onPlaceDelete}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EditJourney;
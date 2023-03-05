import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import MapEdit from '../../components/map-edit/map-edit';
import DateSelector from "../../components/date-selector/date-selector";

import { JourneysContext } from '../../contexts/journeys-context';

const blankJourney = {
  title: "",
  places: []
};

const EditJourney = () => {

  const {
    readJourney,
    updateJourney
  } = useContext(JourneysContext);

  const [ journey, setJourney ] = useState(blankJourney);

  const [ activePlace, setActivePlace ] = useState(null);

  const { journeyId } = useParams();

  const [show, setShow] = useState(false);

  let navigate = useNavigate();

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

  const onStartDateChange = (date) => {
    setJourney({ ...journey, startDate: date.getTime() });
  }

  const onSubmit = () => {
    updateJourney(journey);
    navigate("/viewJourneys");
}

const onCancel = () => {
    navigate("/viewJourneys");
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
        <Col className="my-2">
          <DateSelector
            labelText={"Start Date:"}
            date={journey?.startDate}
            setDate={onStartDateChange}
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
      <Row>
        <Col md={2} xs={6} className="my-1">
          <Button className="w-100" variant="primary" onClick={onSubmit}>Save</Button>
        </Col>
        <Col md={2} xs={6} className="my-1">
          <Button className="w-100" variant="secondary" onClick={onCancel}>Cancel</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default EditJourney;
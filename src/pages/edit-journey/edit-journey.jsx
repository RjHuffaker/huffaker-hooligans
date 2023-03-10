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
  description: "",
  places: []
};

const EditJourney = () => {

  const {
    activePlace,
    setActivePlace,
    readJourney,
    updateJourney
  } = useContext(JourneysContext);

  const { journeyId } = useParams();

  const [show, setShow] = useState(false);

  const [journey, setJourney] = useState(blankJourney);

  let navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchJourney = async () => {
      const response = await readJourney(journeyId);
      setJourney(response);
    }

    fetchJourney();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJourney({ ...journey, [name]: value });
  }

  const onStartDateChange = (date) => {
    setJourney((journey) => ({
      ...journey,
      startDate: date.getTime()
    }));
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
        <Col lg={8} md={6}>

          <Row>
            <Col xs="auto">
              <label htmlFor="title">Journey Title: </label>
            </Col>
            
            <Col>
              <input
                className="ms-auto form-control"
                id="title"
                name="title"
                type="text"
                value={journey?.title}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Col>

        <Col lg={4} md={6}>
          <DateSelector
            labelText={"Start Date:"}
            date={journey?.startDate}
            setDate={onStartDateChange}
          />
        </Col>

        <Button md={6} variant="primary" className="float-end d-lg-none" onClick={handleShow}>
          Show/Hide Places
        </Button>
      </Row>

      <Row className="h-100">

        <Col lg={3} style={{ "overflowY": "scroll", height: "100%" }} className="d-xl-block d-lg-block d-md-none d-sm-none d-none">
          <Offcanvas show={show} onHide={handleClose} responsive="lg">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Show/Hide Places</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ListGroup className="w-100">
                {journey?.places.map((place) =>
                  <ListGroup.Item
                    key={place.id}
                    variant="light"
                    action
                    active={place.id === activePlace?.id}
                    onClick={() => activePlace?.id === place.id ? setActivePlace(null) : setActivePlace(place)}
                  >
                    <Row>
                      <Col>
                        {place.title}
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
            journey={journey}
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
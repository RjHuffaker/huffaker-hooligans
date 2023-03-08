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

const EditJourney = () => {

  const {
    activeJourney,
    setActiveJourney,
    activePlace,
    setActivePlace,
    readJourney,
    updateJourney
  } = useContext(JourneysContext);

  const { journeyId } = useParams();

  const [show, setShow] = useState(false);

  let navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchJourney();
  }, []);

  const fetchJourney = async () => {
    const response = await readJourney(journeyId);
    setActiveJourney(response);
  }

  const onTitleChange = (event) => {
    setActiveJourney((activeJourney) => ({
      ...activeJourney,
      title: event.target.value
    }));
  }

  const onDescriptionChange = (event) => {
    setActiveJourney((activeJourney) => ({
      ...activeJourney,
      description: event.target.value
    }));
  }

  const onStartDateChange = (date) => {
    setActiveJourney((activeJourney) => ({
      ...activeJourney,
      startDate: date.getTime()
    }));
  }

  const onSubmit = () => {
    updateJourney(activeJourney);
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
            id="title"
            name="title"
            type="text"
            value={activeJourney?.title}
            onChange={onTitleChange}
          />
        </Col>
        <Col className="my-2">
          <DateSelector
            labelText={"Start Date:"}
            date={activeJourney?.startDate}
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

        <Col lg={3} style={{ "overflowY": "scroll", height: "100%" }} className="d-xl-block d-lg-block d-md-none d-sm-none d-none">

          <Offcanvas show={show} onHide={handleClose} responsive="lg">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Show/Hide Places</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ListGroup>
                {activeJourney?.places.map((place) =>
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
            places={activeJourney?.places}
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
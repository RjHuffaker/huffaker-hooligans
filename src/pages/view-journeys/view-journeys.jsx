import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import MapView from '../../components/map-view/map-view';

import { JourneysContext } from '../../contexts/journeys-context';
import { UserContext } from '../../contexts/user-context';

const ViewJourneys = () => {
  
  const { journeys, setJourneys } = useContext(JourneysContext);

  const { currentUser } = useContext(UserContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  const selectJourney = (journey) => {
    journey.selected = !journey.selected;
    const index = journeys.findIndex(obj => obj.id === journey.id);
    
    if (index !== -1) {
      setJourneys(oldJourneys => {
        const newJourneys = [...oldJourneys];
        newJourneys[index] = journey;
        return [...newJourneys];
      });
    }
  }

  const editJourney = (journey) => {
    navigate(`/editJourney/`+journey.id);
  }

  return (
    <Container className="h-75">
      <Row>
        <Col>
          <h3 className="caveatBrush">Journeys</h3>
        </Col>
        <Col>
          <Button variant="primary" className="float-end d-lg-none" onClick={handleShow}>
            Show/Hide Journeys
          </Button>
        </Col>
      </Row>

      <Row className="h-100">
        <Col lg={3} style={{"overflowY":"scroll", height: "100%"}} className="d-xl-block d-lg-block d-md-none d-sm-none d-none">
          
          <Offcanvas show={show} onHide={handleClose} responsive="lg">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Show/Hide Journeys</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ListGroup className="w-100">
                {journeys?.sort((a, b) => {
                    return Math.round(a?.startDate - b?.startDate);
                  })
                  .map((journey) =>
                    <ListGroup.Item
                      key={journey.id}
                      variant="light"
                      action
                      active={journey.selected}
                      onClick={() => selectJourney(journey)}
                    >
                      <Row>
                        <Col>
                          {journey.title}
                        </Col>
                        <Col xs={2}>
                          {currentUser && <>
                            <span className="text-primary" variant="primary" onClick={() => editJourney(journey)}>&#9998;</span>
                          </>}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                )}
              </ListGroup>

            </Offcanvas.Body>
          </Offcanvas>

        </Col>
        <Col lg={9} md={12} className="h-100">
          <MapView
            journeys={journeys}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewJourneys;
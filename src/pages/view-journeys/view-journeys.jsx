import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import Breadcrumb from 'react-bootstrap/Breadcrumb';
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

  const editJourney = (journeyId) => {
    navigate(`/editJourney/`+journeyId);
  }
  
  return (
    <Container className="h-75">
      <Row>
        <h3 className="caveatBrush">Journeys</h3>
      </Row>
      <Row className="h-100">
        <Col xs={3}>
          <ListGroup>
            {journeys?.map((journey) =>
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
                        <span className="text-primary" variant="primary" onClick={() => editJourney(journey.id)}>&#9998;</span>
                      </>}
                    </Col>
                  </Row>
                </ListGroup.Item>
            )}
          </ListGroup>


        </Col>
        <Col xs={9} className="h-100">
          <MapView
            journeys={journeys}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewJourneys;
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import MapView from '../../components/map-view/map-view';
import SelectableList from '../../components/selectable-list/selectable-list';

import { JourneysContext } from '../../contexts/journeys-context';
import { UserContext } from '../../contexts/user-context';

const ViewJourneys = () => {
  
  const { journeys, selectJourney } = useContext(JourneysContext);

  const { currentUser } = useContext(UserContext);

  let navigate = useNavigate();

  const editJourney = (journeyId) => {
    navigate(`/editJourney/`+journeyId);
  }
  
  return (
    <Container className="h-75">
      <Row className="h-100">
        <Col xs={3}>
          <SelectableList
            itemList={journeys}
            selectItem={selectJourney}
            allowEdit={currentUser}
            onEditItem={editJourney}
          />
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
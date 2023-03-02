import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import MapEdit from '../../components/map-edit/map-edit';
import SelectableList from '../../components/selectable-list/selectable-list';

import { JourneysContext } from '../../contexts/journeys-context';
import { UserContext } from '../../contexts/user-context';

const EditJourney = () => {
  const { readJourney } = useContext(JourneysContext);

  const [ journey, setJourney ] = useState(null);

  const { journeyId } = useParams();

  useEffect(() => {
    const fetchJourney = async () => {
      const response = await readJourney(journeyId);
      setJourney(response);
    }

    fetchJourney();
  }, [readJourney, journeyId]);

  return (
    <Container className="h-75">
      <Row className="h-100">
        <Col xs={3}>
          <SelectableList
            itemList={journey?.places}
          />
        </Col>
        <Col xs={9} className="h-100">
          <MapEdit
            journey={journey}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default EditJourney;
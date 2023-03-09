import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { JourneysContext } from '../../contexts/journeys-context';

import DateSelector from '../date-selector/date-selector';

const PlaceCreateDialog = ({ journey }) => {

  const {
    activePlace,
    setActivePlace,
    activeJourney,
    setActiveJourney,
    updateJourney
  } = useContext(JourneysContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivePlace({ ...activePlace, [name]: value })
  }

  const onArrivalDateChange = (date) => {
    setActivePlace({ ...activePlace, arrivalDate: date.getTime() });
  }

  const submitNewPlace = (place) => {
    place.id = place?.position.lat.toString() + place?.position.lng.toString();
    activeJourney.places.push(place);
    updateJourney(activeJourney);
    setActivePlace(null);
  }

	return(
		<Container className="InfoWindow">
      <Row>
        <h3>Add Place</h3>
      </Row>
      <Row>
        <label htmlFor="place-title">Title</label>
          <input
            className="form-control"
            name="title"
            type="text"
            value={activePlace.title}
            onChange={handleChange}
          />
      </Row>
      <Row>
        <label htmlFor="place-description">Description</label>
        <textarea
          className="form-control"
          name="description"
          type="text"
          value={activePlace.description}
          onChange={handleChange}
        />
      </Row>
      
      <Row>
        <DateSelector
          labelText={"Arrival Date:"}
          date={activePlace.arrivalDate}
          setDate={onArrivalDateChange}
        />
      </Row>

      <Row>
        <Button variant="success" onClick={() => submitNewPlace(activePlace)}>Submit New Place</Button>
      </Row>
    </Container>
	)
}

export default PlaceCreateDialog;
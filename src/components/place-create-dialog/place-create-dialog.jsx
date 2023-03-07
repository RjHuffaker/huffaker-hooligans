import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { JourneysContext } from '../../contexts/journeys-context';

const PlaceCreateDialog = () => {

  const {
    activePlace,
    setActivePlace,
    activeJourney,
    setActiveJourney,
    updateJourney
  } = useContext(JourneysContext);

  const onTitleChange = (event) => {
    const newValue = event.target.value;
    setActivePlace({...activePlace, title: newValue});
  }

  const onDescriptionChange = (event) => {
    const newValue = event.target.value;
    setActivePlace({...activePlace, description: newValue});
  }

  const onStartDateChange = (date) => {
    setActivePlace({ ...activePlace, startDate: date.getTime() });
  }

  const submitNewPlace = () => {
    setActivePlace(null);
    onPlaceSubmit(activePlace);
  }

  const onPlaceSubmit = (place) => {
    place.id = place?.position.lat.toString() + place?.position.lng.toString();
    activeJourney.places.push(place);
    updateJourney(activeJourney);
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
            id="place-title"
            name="place-title"
            type="text"
            value={activePlace.title}
            onChange={onTitleChange}
          />
      </Row>
      <Row>
        <label htmlFor="place-description">Description</label>
        <textarea
          className="form-control"
          id="place-description"
          name="place-description"
          type="text"
          value={activePlace.description}
          onChange={onDescriptionChange}
        />
      </Row>
      
      <Row>
        <span htmlFor="place-lat">Latitude: {activePlace.position.lat}</span>
      </Row>
      <Row>
        <span htmlFor="place-lat">Longitude: {activePlace.position.lng}</span>
      </Row>
      <Row>
        <Button variant="success" onClick={submitNewPlace}>Submit New Place</Button>
      </Row>
    </Container>
	)
}

export default PlaceCreateDialog;
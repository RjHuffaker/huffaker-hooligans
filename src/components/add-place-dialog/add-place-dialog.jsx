import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';

const AddPlaceDialog = ({activePlace, onTitleChange, onDescriptionChange, submitNewPlace}) => {
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

export default AddPlaceDialog;
import { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { UserContext } from '../../contexts/user-context'; 

import DeleteModalButton from '../delete-modal-button/delete-modal-button'

const ViewPlaceDialog = ({activePlace, onTitleChange, onDescriptionChange, onSaveClick, onDeleteClick}) => {
  const { currentUser } = useContext(UserContext);

  const [ editMode, setEditMode ] = useState(false);
  
  return(
    editMode ?
      <div className="InfoWindow" key={activePlace.id}>
        <Container>
          <Row>
            <h3>Edit Place</h3>
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
            <Col>
              <Button variant="outline-success" onClick={()=>{setEditMode(false); onSaveClick()}}>&#x2714;</Button>
              <DeleteModalButton deleteObject={activePlace} deleteAction={onDeleteClick}>&#128465;</DeleteModalButton>
            </Col>
          </Row>
        </Container>
      </div>
      :
      <div className="InfoWindow" key={activePlace.id}>
        <Container>
          <Row>
            <Col>
              <h3>{activePlace.title}</h3>
            </Col>
          </Row>
          <Row className="my-3">
            <p>{activePlace.description}</p>
          </Row>
          {currentUser && 
            <Row>
              <Col>
                <Button variant="outline-primary" onClick={() => {setEditMode(true)}}>&#9998;</Button>
              </Col>
            </Row>
          }
        </Container>
      </div>
  )
}

export default ViewPlaceDialog;
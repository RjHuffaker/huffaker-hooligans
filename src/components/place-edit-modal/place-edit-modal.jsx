import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import DeleteModalButton from '../../components/delete-modal-button/delete-modal-button';

const PlaceEditModal = ({ place, onTitleChange, onDescriptionChange, onSaveClick, onDeleteClick }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        &#9998;
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Place</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <label htmlFor="place-title">Title</label>
              <input
                className="form-control"
                id="place-title"
                name="place-title"
                type="text"
                value={place?.title}
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
                value={place?.description}
                onChange={onDescriptionChange}
              />
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button variant="outline-success" onClick={()=>{onSaveClick(); handleClose()}}>&#x2714;</Button>
              <DeleteModalButton deleteObject={place} deleteAction={onDeleteClick}>&#128465;</DeleteModalButton>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PlaceEditModal;
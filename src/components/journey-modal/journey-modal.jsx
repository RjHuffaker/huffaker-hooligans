import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const JourneyModal = ({ journey, setJourney, onSubmit, modalText, children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const onTitleChange = (event) => {
    setJourney({...journey, title: event.target.value});
  }

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        {children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control"
            value={journey.title}
            onChange={onTitleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {onSubmit(journey); handleClose()}}>
            Add
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default JourneyModal;
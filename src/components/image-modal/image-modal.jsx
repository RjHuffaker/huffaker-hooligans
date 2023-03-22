import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ImageModal = ({image}) => {

  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <img src={image.xs_img} alt={image.xs_img} onClick={handleShow} />
      
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Body>
          <img src={image.lg_img} alt={image.lg_img} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ImageModal;
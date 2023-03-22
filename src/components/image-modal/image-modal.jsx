import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

import './image-modal.css';

const ImageModal = ({image}) => {

  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <img src={image.xs_img} alt={image.xs_img} onClick={handleShow} />
      
      <Modal dialogClassName="image-modal" size="lg" show={show} onHide={handleClose}>
        <Modal.Body>
          <Image src={image.lg_img} alt={image.lg_img} rounded={true}/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ImageModal;
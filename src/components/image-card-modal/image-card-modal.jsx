import { useState, useContext } from 'react';

import Modal from 'react-bootstrap/Modal';

import { ImagesContext } from '../../contexts/images-context';

import DeleteModalButton from '../delete-modal-button/delete-modal-button'

import './image-card-modal.css';

const ImageCardModal = ({image}) => {

  const [ show, setShow ] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { deleteImage } = useContext(ImagesContext);

  const deleteHandler = () => {
    deleteImage(image);
  }

  return (
    <>
      <div className="image-thumb">
          <img
            src={image.sm_img}
            alt={image.sm_img}
            onClick={handleShow}
          />
      </div>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="image-modal">
            <img
              src={image.lg_img}
              srcSet={`
                ${image.md_img} 992w,
                ${image.lg_img} 1200w,
                ${image.xl_img} 1400w
              `}
              alt={image.lg_img}
            />
          </div>
          <DeleteModalButton deleteObject={image} deleteAction={deleteHandler}>&#128465;</DeleteModalButton>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ImageCardModal;
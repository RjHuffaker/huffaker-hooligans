import { useState, useContext } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { UserContext } from "../../contexts/user-context";
import { ImagesContext } from '../../contexts/images-context';

import DeleteModalButton from '../../components/delete-modal-button/delete-modal-button'
import Checkbox from '../../components/checkbox/checkbox'

import './image-card-modal.css';

const ImageCardModal = ({image}) => {

  const { currentUser } = useContext(UserContext);
  const { deleteImage, updateImageData } = useContext(ImagesContext);
  
  const [ imageData, setImageData ] = useState(image);

  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const deleteHandler = () => {
    deleteImage(imageData);
  }

  const acceptHandler = () => {
    updateImageData(imageData);
    handleClose();
  }

  const onCheckFeatured = (event) => {
    const checked = event.target.checked;
    setImageData({...imageData, featured: checked});
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setImageData({ ...imageData, [name]: value })
  }

  return (
    <>
      <div className="image-thumb">
          <img
            src={imageData.sm_img}
            alt={imageData.sm_img}
            onClick={handleShow}
          />
      </div>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="image-modal">
            <img
              src={imageData.lg_img}
              srcSet={`
                ${imageData.md_img} 992w,
                ${imageData.lg_img} 1200w,
                ${imageData.xl_img} 1400w
              `}
              alt={imageData.lg_img}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {currentUser && <>
            <Button variant="outline-success" onClick={acceptHandler}>
              &#x2714;
            </Button>
            <input
              name="caption"
              type="text"
              value={imageData.caption}
              onChange={handleChange}
            />
            <Checkbox
              name="featured"
              label="Featured"
              value={imageData.featured}
              onChange={onCheckFeatured}
            />
            <DeleteModalButton
              deleteObject={imageData}
              deleteAction={deleteHandler}
            >
              &#128465;
            </DeleteModalButton>
          </>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageCardModal;
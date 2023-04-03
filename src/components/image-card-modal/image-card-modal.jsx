import { useState, useContext } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import { UserContext } from "../../contexts/user-context";
import { ImagesContext } from '../../contexts/images-context';

import DeleteModalButton from '../../components/delete-modal-button/delete-modal-button'
import Checkbox from '../../components/checkbox/checkbox'

import './image-card-modal.css';

const ImageCardModal = ({image, onAccept, onDelete}) => {

  const { currentUser } = useContext(UserContext);
  const { deleteImage, updateImageData } = useContext(ImagesContext);
  
  const [ imageData, setImageData ] = useState(image);

  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const deleteHandler = () => {
    deleteImage(imageData);
    onDelete(image);
  }

  const acceptHandler = () => {
    updateImageData(imageData);
    onAccept(image);
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
        <span className="float-start">
          {imageData.featured && <> &#129351; </>}
        </span>
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
            <Col>
              <input
                className="w-100"
                name="caption"
                type="text"
                placeholder="Carousel Caption..."
                value={imageData.caption}
                onChange={handleChange}
              />
            </Col>
            <Col xl={1} lg={2} md={3}>
              <Checkbox
                name="featured"
                label="Featured"
                value={imageData.featured}
                onChange={onCheckFeatured}
              />
            </Col>
            <Col xl={1} lg={2} md={3}>
              <Button variant="outline-success" onClick={acceptHandler}>
                &#x2714;
              </Button>
              <DeleteModalButton
                deleteObject={imageData}
                deleteAction={deleteHandler}
              >
                &#128465;
              </DeleteModalButton>
            </Col>
          </>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageCardModal;
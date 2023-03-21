import { useContext, useState } from "react";

import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
import Modal from 'react-bootstrap/Modal';

import { ImagesContext } from "../../contexts/images-context";

const UploadModal = () => {
  const { stageImage, uploadImage, uploadImageData } = useContext(ImagesContext);
  
  const [ show, setShow ] = useState(false);
  const [ percent, setPercent ] = useState();
  const [ imageFile, setImageFile ] = useState();


  const handleClose = () => {
    setImageFile(null);
    setPercent(0);
    setShow(false);
  };
  
  const handleShow = () => setShow(true);

  const onAccept = () => {
    uploadImageData();
    handleClose();
  }

  const onCancel = () => {
    handleClose();
  }

  const onFileChange = (file) => {
    setImageFile(URL.createObjectURL(file));
    stageImage(file, setPercent);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Upload Image
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <input
              type="file"
              className="form-control"
              onChange={(event) => {
                onFileChange(event.target.files[0]);
              }}
            />
          </InputGroup>
          
          {
            imageFile ? <img className="h-100 w-100" src={imageFile} alt={imageFile.name} /> :
            percent > 0 ? <p>{percent}% done</p> : <p>Upload Image</p>
          }

        </Modal.Body>
        <Modal.Footer>
          {percent===100 && 
            <Button variant="primary" onClick={onAccept}>
              Accept
            </Button>
          }
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadModal;
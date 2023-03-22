import { useContext, useState } from "react";

import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
import Modal from 'react-bootstrap/Modal';

import { ImagesContext } from "../../contexts/images-context";

const UploadModal = ({handleAccept, handleFileChange, handleCancel}) => {
  
  const { imageFile, stagePercent, setStagePercent } = useContext(ImagesContext);

  const [ previewImage, setPreviewImage ] = useState();

  const [ show, setShow ] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  
  const handleShow = () => setShow(true);

  const onAccept = async () => {
    setPreviewImage(null);
    handleAccept();
    handleClose();
  }

  const onCancel = () => {
    setPreviewImage(null);
    handleClose();
    handleCancel();
  }

  const onFileChange = (file) => {
    setPreviewImage(URL.createObjectURL(file));
    handleFileChange(file);
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
            previewImage ? <img className="h-100 w-100" src={previewImage} alt={previewImage.name} /> :
            stagePercent > 0 ? <p>{stagePercent}% done</p> : <p>Upload Image</p>
          }

        </Modal.Body>
        <Modal.Footer>
          {stagePercent === 100 && 
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
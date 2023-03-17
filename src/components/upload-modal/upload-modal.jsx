import { useContext, useState } from "react";

import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
import Modal from 'react-bootstrap/Modal';

import { ImagesContext } from "../../contexts/images-context";

const UploadModal = ({onFileChosen}) => {
  const { uploadImage } = useContext(ImagesContext);
  
  const [ show, setShow ] = useState(false);
  const [ percent, setPercent ] = useState();
  const [ imageUrl, setImageUrl ] = useState();
  const [ downloadUrl, setDownloadUrl ] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onAccept = () => {
    onFileChosen(downloadUrl);
    handleClose();
  }

  const onCancel = () => {
    handleClose();
  }

  const onFileChange = (imageFile) => {
    uploadImage(imageFile, 200, 200, setPercent, setDownloadUrl);
    uploadImage(imageFile, 400, 400, setPercent, ()=>{});
    uploadImage(imageFile, 600, 600, setPercent, ()=>{});
    uploadImage(imageFile, 800, 800, setPercent, ()=>{});
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
            downloadUrl ? <img className="w-100" src={downloadUrl} alt={downloadUrl}/> :
              imageUrl ? <img className="w-100" src={imageUrl} alt={imageUrl}/> :
              percent > 0 ? <p>{percent}% done</p> : <p>Upload Image</p>
          }

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onAccept}>
            Accept
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadModal;
import { useState } from "react";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { storage } from "../../config/firebase";

import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
import Modal from 'react-bootstrap/Modal';

const ImageUploadModal = ({imageUrl, setImageUrl}) => {
    
  const [ show, setShow ] = useState(false);
  const [ imageFile, setImageFile ] = useState(null);
  const [ percent, setPercent ] = useState();
  const [ downloadUrl, setDownloadUrl ] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onAccept = () => {
    setImageUrl(downloadUrl);
    handleClose();
  }

  const onCancel = () => {
    handleClose();
  }

  const onDelete = () => {
    setImageUrl(null);
    const imageRef = ref(storage, imageUrl);

    console.log(imageRef);

    deleteObject(imageRef).then(() => {
      handleClose();
    }).catch((error) => {
      console.log(error);
    });

  }

  const uploadFile = (imageFile) => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
        );
      
        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadUrl(url);
        });
      }
    );
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Upload Image
      </Button>
      {imageUrl && <img className="w-100" src={imageUrl} alt={imageUrl}/>}

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
                uploadFile(event.target.files[0]);
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
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageUploadModal;
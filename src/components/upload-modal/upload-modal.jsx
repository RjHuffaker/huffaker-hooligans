import { useState } from "react";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
import Modal from 'react-bootstrap/Modal';

import { storage } from "../../config/firebase-storage";

import { resizeImageFile } from "../../config/image-resizer";

const UploadModal = ({onFileChosen}) => {
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

  const uploadFile = async (imageFile) => {
    if (imageFile == null) return;
    await resizeImageFile(imageFile, 400, 400)
      .then((uri) =>{
        console.log(uri);
        const imageRef = ref(storage, `images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(imageRef, uri);

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

      });

    
  };

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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadModal;
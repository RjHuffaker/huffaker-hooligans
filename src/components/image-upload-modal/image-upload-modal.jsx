import { useContext, useState } from "react";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";

import { ImagesContext } from "../../contexts/images-context";

const ImageUploadModal = ({ handleAccept, ...otherProps }) => {
  const {
    stageImage,
    stagedImages,
    uploadImage,
    createImageData,
    stagePercent,
  } = useContext(ImagesContext);

  const [previewImage, setPreviewImage] = useState();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onAccept = async () => {
    setPreviewImage(null);
    stageImage(null);
    handleClose();
    const downloadUrls = await uploadImage(stagedImages);
    const newImageData = await createImageData(downloadUrls);
    handleAccept(newImageData);
  };

  const onCancel = () => {
    setPreviewImage(null);
    stageImage(null);
    handleClose();
  };

  const onFileChange = (file) => {
    setPreviewImage(URL.createObjectURL(file));
    stageImage(file);
  };

  const getExtension = (filename) => {
    return filename.split(".").pop().toLowerCase();
  };

  return (
    <>
      <Button {...otherProps} onClick={handleShow}>
        Upload Image
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Supported file formats: PNG, JPG, JPEG, BMP.</p>
          <p>No more than 5mb per file.</p>
          <InputGroup>
            <input
              type="file"
              className="form-control"
              onChange={(event) => {
                if (getExtension(event.target.value) === "heic")
                  return alert("Unsupported file type!");

                onFileChange(event.target.files[0]);
              }}
            />
          </InputGroup>

          {previewImage && (
            <img className="h-100 w-100" src={previewImage} alt="preview" />
          )}
        </Modal.Body>
        <Modal.Footer>
          {stagePercent === 100 && (
            <Button variant="primary" onClick={onAccept}>
              Accept
            </Button>
          )}

          {stagePercent !== 0 && stagePercent !== 100 && (
            <p>{stagePercent}% done</p>
          )}

          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageUploadModal;

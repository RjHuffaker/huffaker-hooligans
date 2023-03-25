import { useContext, useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ImageUploadModal from '../../components/image-upload-modal/image-upload-modal';

import { ImagesContext } from "../../contexts/images-context";

const ImageSelectModal = ({handleAccept}) => {

  const { allImages } = useContext(ImagesContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onAccept = async (image) => {
    handleClose();
    handleAccept(image);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Select Image
      </Button>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Body>

          <Container>
            <Row className="g-2">
              <Col xl={3} md={4} xs={6} className="gallery-item my-auto">
                <ImageUploadModal
                  handleAccept={onAccept}
                />
              </Col>
              {allImages?.map((image, i)=>(
                <Col xl={3} md={4} xs={6} key={i} className="gallery-item my-auto">
                  <div className="image-thumb">
                    <img
                      src={image.xs_img}
                      srcSet={`
                        ${image.xs_img} 1200w,
                        ${image.sm_img} 1400w
                      `}
                      alt={image.xs_img}
                      onClick={() => onAccept(image)}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Container>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default ImageSelectModal;
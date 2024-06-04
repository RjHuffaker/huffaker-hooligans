import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ImageCardModal from "../../components/image-card-modal/image-card-modal";

const ImageGallery = ({ images, onAccept, onDelete }) => {
  console.log(images);
  return (
    <Container>
      <Row className="g-2">
        {images
          ?.map((image, i) => (
            <Col xl={3} md={4} xs={6} key={i} className="gallery-item my-auto">
              <ImageCardModal
                image={image}
                onAccept={onAccept}
                onDelete={onDelete}
              />
            </Col>
          ))
          .sort((a, b) => {
            if (a.dateTaken === b.dateTaken) {
              return 0;
            }
            if (a.dateTaken === null) {
              return -1;
            }
            if (b.dateTaken === null) {
              return 1;
            }
            return a.dateTaken - b.dateTaken;
          })}
      </Row>
    </Container>
  );
};

export default ImageGallery;

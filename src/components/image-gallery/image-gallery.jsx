import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ImageCardModal from '../../components/image-card-modal/image-card-modal';

const ImageGallery = ({images, onAccept, onDelete}) => {
	
	return (
		<Container>
			<Row className="g-2">
				{images?.map((image, i)=>(
					<Col xl={3} md={4} xs={6} key={i} className="gallery-item my-auto">
						<ImageCardModal image={image} onAccept={onAccept} onDelete={onDelete}/>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default ImageGallery;
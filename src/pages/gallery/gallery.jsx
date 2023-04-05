import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { UserContext } from '../../contexts/user-context';
import { ImagesContext } from '../../contexts/images-context';

import ImageUploadModal from '../../components/image-upload-modal/image-upload-modal';
import ImageCardModal from '../../components/image-card-modal/image-card-modal';

import './gallery.css';

const Gallery = () => {
	
	const {
		allImages,
		getAllImages,
		uploadPercent,
		updateImageData,
		deleteImage
	} = useContext(ImagesContext);

	const { currentUser } = useContext(UserContext);

	const handleAccept = async () => {
		getAllImages();
	}

	const handleImageAccept = (imageData) => {
		updateImageData(imageData);
		getAllImages();
	}

	const handleImageDelete = (imageData) => {
		deleteImage(imageData);
	}

	return (
		<Container>
			<Row className="g-2">
				{currentUser?.uid && <Col className="gallery-item">
					<Card xl={3} md={4} xs={6} className="align-items-center text-center">
						<Card.Body>
							{uploadPercent===0 ?
								<ImageUploadModal
									handleAccept={handleAccept}
								/> : 
								<p>{uploadPercent}</p>
							}
						</Card.Body>
					</Card>
				</Col>}
				
				{allImages?.sort((a, b) => a.dateTaken - b.dateTaken)
					.map((image, i)=>(
					<Col xl={3} md={4} xs={6} key={i} className="gallery-item my-auto">
						<ImageCardModal
							image={image}
							onAccept={handleImageAccept}
							onDelete={handleImageDelete}
						/>
					</Col>
				))}
				
			</Row>
		</Container>
	);
}

export default Gallery;
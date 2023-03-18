import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ImagesContext } from '../../contexts/images-context';

import UploadModal from '../../components/upload-modal/upload-modal';
import ImageCard from '../../components/image-card/image-card';

const Gallery = () => {

	const { allImages } = useContext(ImagesContext);

	return (
		<Container>
			<Row>
				{allImages?.map((image)=>(
					<Col xs={3} key={image.id}>
						<ImageCard image={image} />
					</Col>
				))}
				<Col xs={3}>
					<UploadModal />
				</Col>
			</Row>
		</Container>
	);
}

export default Gallery;
import { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ImagesContext } from '../../contexts/images-context';

import UploadModal from '../../components/upload-modal/upload-modal'

const Gallery = () => {

	const { imageUrls, setImageUrls, getAllImageUrls } = useContext(ImagesContext);

	const [ newImage, setNewImage ] = useState(null);

	const addImage = (url) => {
		setImageUrls((prev) => [...prev, url]);
	}

	return (
		<Container>
			<Row>
				{imageUrls
					.map((url, index) => (
						<Col xs={3} key={index}>
							<img src={url} alt={url} />
						</Col>
					))}
				<Col xs={3}>
					<UploadModal onFileChosen={addImage} />
				</Col>
			</Row>
		</Container>
	);
}

export default Gallery;
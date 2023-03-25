import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ImagesContext } from '../../contexts/images-context';

import ImageUploadModal from '../../components/image-upload-modal/image-upload-modal';
import ImageCardModal from '../../components/image-card-modal/image-card-modal';

import './gallery.css';

const Gallery = () => {
	
  const {
		allImages,
		getAllImages,
		stageImage,
		stagedImages,
		uploadImage,
		uploadPercent,
		createImageData
	} = useContext(ImagesContext);

	const handleAccept = async () => {
		
    const downloadUrls = await uploadImage(stagedImages);
	
    createImageData(downloadUrls);
		stageImage(null);
		getAllImages();
  }

	return (
		<Container>
			<Row className="g-2">
				{allImages?.map((image, i)=>(
					<Col xl={3} md={4} xs={6} key={i} className="gallery-item my-auto">
						<div>
							<ImageCardModal image={image} />
						</div>
					</Col>
				))}
				
				<Col xl={3} md={4} xs={6} className="gallery-item my-auto">
					{uploadPercent===0 ?
						<ImageUploadModal
							handleAccept={handleAccept}
						/> : 
						<p>{uploadPercent}</p>
					}
				</Col>
				
			</Row>
		</Container>
	);
}

export default Gallery;
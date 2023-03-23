import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ImagesContext } from '../../contexts/images-context';

import UploadModal from '../../components/upload-modal/upload-modal';
import ImageCardModal from '../../components/image-card-modal/image-card-modal';

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

	const handleFileChange = (file) => {
    stageImage(file);
  }

	const handleCancel = () => {
		stageImage(null);
	}

	return (
		<Container>
			<Row>
				{allImages?.map((image, i)=>(
					<Col xs={3} key={i}>
						<ImageCardModal image={image} />
					</Col>
				))}
				
				<Col xs={3}>
					{uploadPercent===0 ?
						<UploadModal
							handleAccept={handleAccept}
							handleFileChange={handleFileChange}
							handleCancel={handleCancel}
						/> : 
						<p>{uploadPercent}</p>
					}
				</Col>
				
			</Row>
		</Container>
	);
}

export default Gallery;
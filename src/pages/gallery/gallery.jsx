import { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ImagesContext } from '../../contexts/images-context';

import UploadModal from '../../components/upload-modal/upload-modal';
import ImageCard from '../../components/image-card/image-card';

const Gallery = () => {
	
  const {
		allImages,
		getAllImages,
		stageImage,
		stagedImages,
		progress,
		setProgress,
		uploadImage,
		createImageData,
		percent,
		setPercent,
		imageFile,
		setImageFile
	} = useContext(ImagesContext);

	const handleAccept = async () => {
    const downloadUrls = await uploadImage(stagedImages);
    createImageData(downloadUrls);
		getAllImages();
  }

	const handleFileChange = (file) => {
    setImageFile(URL.createObjectURL(file));
    stageImage(file, setPercent);
  }

	const handleCancel = () => {
    setImageFile(null);
		stageImage(null);
    setPercent(0);
	}

	return (
		<Container>
			<Row>
				{allImages?.map((image)=>(
					<Col xs={3} key={image.id ? image.id : image.name}>
						<ImageCard image={image} />
					</Col>
				))}
				
				<Col xs={3}>
					{progress === 0 ?
						<UploadModal
							handleAccept={handleAccept}
							handleFileChange={handleFileChange}
							handleCancel={handleCancel}
						/> : 
						<p>{progress}</p>
					}
				</Col> : 
				
			</Row>
		</Container>
	);
}

export default Gallery;
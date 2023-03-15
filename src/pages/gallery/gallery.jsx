import { useContext } from 'react';

import { ImagesContext } from '../../contexts/images-context';

const Gallery = () => {

	const { imageUrls } = useContext(ImagesContext);

	return (
		<>
			{imageUrls.map((url, index) => (
				<img key={index} src={url} alt={url} />
			))}
		</>
	);
}

export default Gallery;
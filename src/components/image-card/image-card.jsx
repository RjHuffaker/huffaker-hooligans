import { useContext } from 'react';

import { ImagesContext } from '../../contexts/images-context';

const ImageCard = ({ image }) => {

  const { deleteImage } = useContext(ImagesContext);

  const onDelete = () => {
    deleteImage(image);
  }

  return (
    <div>
      <p>{image.id ? image.id : image.name}</p>
      <img src={image.xs_img} alt={image.id ? image.id : image.name} />
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default ImageCard;
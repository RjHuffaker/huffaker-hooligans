import { useContext } from 'react';

import { ImagesContext } from '../../contexts/images-context';

import DeleteModalButton from '../delete-modal-button/delete-modal-button'

const ImageCard = ({ image }) => {

  const { deleteImage } = useContext(ImagesContext);

  const deleteHandler = () => {
    deleteImage(image);
  }

  return (
    <div>
      <img src={image.xs_img} alt={image.id ? image.id : image.name} />
      <DeleteModalButton deleteObject={image} deleteAction={deleteHandler}>&#128465;</DeleteModalButton>
    </div>
  );
}

export default ImageCard;
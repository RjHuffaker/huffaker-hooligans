import { useContext } from 'react';

import { ImagesContext } from '../../contexts/images-context';

import DeleteModalButton from '../delete-modal-button/delete-modal-button'

import ImageModal from '../image-modal/image-modal';

const ImageCard = ({ image }) => {

  const { deleteImage } = useContext(ImagesContext);

  const deleteHandler = () => {
    deleteImage(image);
  }

  return (
    <div>
      <ImageModal image={image}/>
      <DeleteModalButton deleteObject={image} deleteAction={deleteHandler}>&#128465;</DeleteModalButton>
    </div>
  );
}

export default ImageCard;
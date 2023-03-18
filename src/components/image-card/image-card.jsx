const ImageCard = ({ image }) => {
  return (
    <div>
      <p>{image.name}</p>
      <img src={image.xs_img} alt={image.name} />
    </div>
  );
}

export default ImageCard;
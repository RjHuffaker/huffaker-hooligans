import Carousel from 'react-bootstrap/Carousel';

const ImageCarousel = ({slideList}) => {
  return (
    <Carousel>
      {slideList.map((slide) => (
        <Carousel.Item key={slide.label}>
          <img
            className="d-block w-100"
            src={slide.image}
            alt={slide.label}
          />
          <Carousel.Caption>
            <h3>{slide.label}</h3>
            <p>{slide.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
import Carousel from 'react-bootstrap/Carousel';

const ImageCarousel = ({slideList}) => {
  return (
    <Carousel>
      {slideList.map((slide, i) => (
        <Carousel.Item key={i}>
          <img
            className="d-block w-100"
            src={slide?.md_img}
            srcSet={`
                ${slide?.md_img} 992w,
                ${slide?.lg_img} 1200w,
                ${slide?.xl_img} 1400w
              `}
            alt={slide?.id}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
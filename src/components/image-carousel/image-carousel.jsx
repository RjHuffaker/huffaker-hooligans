import Carousel from "react-bootstrap/Carousel";

import "./image-carousel.css";

const ImageCarousel = ({ slideList }) => {
  return (
    <Carousel>
      {slideList
        .sort((a, b) => b.dateTaken - a.dateTaken)
        .map((slide, i) => (
          <Carousel.Item key={i}>
            <img
              className="carousel-image d-block w-100"
              src={slide?.md_img}
              srcSet={`
                ${slide?.md_img} 992w,
                ${slide?.lg_img} 1200w,
                ${slide?.xl_img} 1400w
              `}
              alt={slide?.id}
              loading={i === 0 ? "eager" : "lazy"}
            />
            <Carousel.Caption>
              <p>{slide?.caption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ImageCarousel;

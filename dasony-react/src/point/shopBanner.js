import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './shopBanner.css';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className='shopBanner-img' src='../resources/shop/banner/001.png' />
      </Carousel.Item>
      <Carousel.Item>
        <img className='shopBanner-img' src='../resources/shop/banner/002.png' />
      </Carousel.Item>
      <Carousel.Item>
        <img className='shopBanner-img' src='../resources/shop/banner/003.png' />
      </Carousel.Item>
      <Carousel.Item>
        <img className='shopBanner-img' src='../resources/shop/banner/004.png' />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
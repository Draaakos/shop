import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Slider = ({ itemList }) => (console.log('itemList', itemList),
  <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false} showIndicators={false}>
    {
      itemList.map((item, index) => (
        <div key={`slider-image-${index}`}>
          <img src={item.url} />
        </div>
      ))
    }
  </Carousel>
);

export default Slider;

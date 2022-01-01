import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Slider = () => (
  <Carousel infiniteLoop autoPlay showThumbs={false} showStatus={false} showIndicators={false}>
    <div>
        <img src="https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_YookaLayleeAndTheImpossibleLair.jpg" />
    </div>
    <div>
        <img src="https://irrompibles.net/irrwp/wp-content/uploads/2018/09/images_2018_informes_shadows-awakening_shadows-awakening-review.jpg" />
    </div>
    <div>
        <img src="https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_YookaLayleeAndTheImpossibleLair.jpg" />
    </div>
  </Carousel>
);

export default Slider;

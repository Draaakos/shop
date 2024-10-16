import Menu from 'ui/Menu';
import Carousel from 'ui/Carousel';

const HomeApp = () => {
  const images = [
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`,
    `/static/${VERSION}/images/slider/item-1.png`
  ];

  return (
    <div>
      <Menu />
      <Carousel images={images}/>
    </div>
  );
};

export default HomeApp;

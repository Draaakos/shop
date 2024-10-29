import Carousel from 'ui/Carousel';
import Card from 'ui/Card';
import Publication from 'ui/Publication';
import Menu from './components/Menu/index.jsx';
import useHome from './useHome.js';


const HomeApp = () => {
  const { states, actions } = useHome();

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

  const publications = states.products
    .map((publication, idx) =>
      <Publication key={`publication-${idx}`} data={publication}/>
    );

  return (
    <div>
      <Carousel images={images}/>
      {/* <Menu onSelect={actions.onSelectOptionMenu}/> */}
      <div className="card__section">
        <Card text="OFERTA 1" backgroundImg={`/static/${VERSION}/images/cards/item-1.jpg`} />
        <Card text="OFERTA 2" backgroundImg={`/static/${VERSION}/images/cards/item-1.jpg`} />
        <Card text="OFERTA 3" backgroundImg={`/static/${VERSION}/images/cards/item-1.jpg`} />
      </div>

      <div className='publication__section'>
        {publications}
      </div>
    </div>
  );
};

export default HomeApp;

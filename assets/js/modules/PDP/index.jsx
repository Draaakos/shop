import Menu from 'ui/Menu';
import Footer from 'ui/Footer';
import Product from './Product';


const PDP = () => {
  const product = window.serializedContent;

  return (
    <div>
      <Menu />
      <div className="page">
        <div className="pdp">
          <Product data={product}/>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PDP;

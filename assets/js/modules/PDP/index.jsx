import Menu from 'ui/Menu';
import Product from './Product';


const PDP = () => {
  const product = window.serializedContent;

  return (
    <div>
      <Menu />
      <div className="page">
        <Product data={product}/>
      </div>
    </div>
  );
};

export default PDP;

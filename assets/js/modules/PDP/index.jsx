import Menu from 'ui/Menu';
import Footer from 'ui/Footer';
import Breadcrumb  from 'ui/Breadcrumb';
import Product from './Product';


const PDP = () => {
  const product = window.serializedContent;

  return (
    <div>
      <Menu />
      <div className="page">
        <div className="pdp">
          <div className="pdp__breadcrumb">
            <Breadcrumb items={[
                { name: 'Inicio', url: '/'},
                { name: 'Productos', url: '/productos'},
                { name: product.name, url: null }
              ]}
            />
          </div>

          <Product data={product}/>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PDP;

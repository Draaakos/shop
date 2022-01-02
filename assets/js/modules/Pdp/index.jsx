import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import thousandFormat from 'utils/thousandFormat';
import service from 'services/product';
import Gallery from './components/Gallery';
import { notify } from 'utils/notifications';

const Pdp = ({ initialData }) => {
  const [product, updateProduct] = useState(initialData)
  const [imageSelected, updateImageSelected] = useState(0);
  const [skuSelected, updateSku] = useState(null)
  const [quantity, updateQuantity] = useState(0);

  useEffect(() => {
    if(product.quantity) {
      updateSku(product.sku);
      updateQuantity(1);
    }
  }, []);

  const onChangeQuantity = number => {
    const newQuantity = quantity + number;
    if(newQuantity <= 0) return;
    if(newQuantity > product.quantity) return;

    updateQuantity(quantity + number);
  };


  const onAddToCar = () => {
    if(skuSelected) {
      service.productSku(skuSelected)
        .then(response => {
          const productReady = response.product;

          if(quantity > productReady.quantity) {
            notify('Lo sentimos, ya no hay stock disponible');
            return;
          };

          let carItem = JSON.parse(localStorage.getItem('car'))

          if (!carItem) carItem = [];

          productReady.quantityToBuy = quantity;
          carItem.push({...productReady, ...{ url: window.location.pathname }});
          localStorage.setItem('car', JSON.stringify(carItem));
          window.location.assign('/carrito');
          return;
        })
    }
  };

  const buttonClasses = classNames({
    'default-button': true,
    'default-button--disabled': !skuSelected || !skuSelected
  });

  const addEvent = skuSelected ? onAddToCar : () => {};

  const platformList = product.platform.map((item, index) => (
    <div key={`platform-${index}`} className="platform-section__item">
      <div className={`icon icon--${item.name.toLowerCase()}-white`} />
      {/* <div>{item.name}</div> */}
    </div>
  ));

  return(
    <section className="page-wrapper">
      <div className="breadcrumb">
        <div className="breadcrumb__item">
          <i className="fa fa-home" aria-hidden="true"></i>
          <div>
            <a href="/">Inicio</a>
          </div>
        </div>
        <i className="fa fa-angle-right" aria-hidden="true"></i>
        <div>
          <a href="/productos">productos</a>
        </div>
        <i className="fa fa-angle-right" aria-hidden="true"></i>
        <div>
          <a href={window.location.href}>{product.name}</a>
        </div>
      </div>

      <div className="product-detail">
        <Gallery
          images={product.images}
          imageSelected={imageSelected}
          onClick={updateImageSelected}
        />

        <div className="pdp__detail">
          <div className="pdp__detail__title">{product.name}</div>
          <div className="pdp__detail__brand">{product.brand}</div>
          {/* <div className="pdp__detail__stars">
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            <i className="fa fa-star" aria-hidden="true"></i>
            ( 138 reviews )
          </div> */}
          <div className="pdp__detail__price">{thousandFormat(product.price, 0)} CLP</div>
          <div className="pdp__detail__description">{product.description}</div>
          <div className="pdp-options">
            <div className="quantity-block">
              <div className="quantity-block__label">Cantidad</div>
              <div className="quantity">
                <div className="quantity__element quantity__button" onClick={() => onChangeQuantity(-1)}>-</div>
                <div className="quantity__element">{quantity}</div>
                <div className="quantity__element quantity__button" onClick={() => onChangeQuantity(1)}>+</div>
              </div>
            </div>


            <div>
              <button
                className={buttonClasses}
                onClick={addEvent}
              >
                comprar
              </button>
            </div>
          </div>

          <hr />

          <div className="platform">
            <h4>Plataformas disponibles</h4>
            <div className="platform-section">
              { platformList }
            </div>
          </div>
        </div>
      </div>

      <div className="requeriments">
        <div className="requeriments__wrapper">
          <div className="item-wrapper">
            <div className="requeriments__item">Minimo:</div>
            <div className="requeriments__value">{product.requeriment.minimun}</div>
          </div>
          <div className="item-wrapper">
            <div className="requeriments__item">Recomendado:</div>
            <div className="requeriments__value">{product.requeriment.recommended}</div>
          </div>
          <div className="item-wrapper">
            <div className="requeriments__item">Sistema Operativo:</div>
            <div className="requeriments__value">{product.requeriment.so}</div>
          </div>
          <div className="item-wrapper">
            <div className="requeriments__item">Procesador:</div>
            <div className="requeriments__value">{product.requeriment.proccesor}</div>
          </div>
          <div className="item-wrapper">
            <div className="requeriments__item">Graficos:</div>
            <div className="requeriments__value">{product.requeriment.graphics}</div>
          </div>
          <div className="item-wrapper">
            <div className="requeriments__item">Espacio:</div>
            <div className="requeriments__value">{product.requeriment.storage}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pdp;

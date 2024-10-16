import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import thousandFormat from 'utils/thousandFormat';
import service from 'services/product';
import Color from './components/Color';
import Size from './components/Size';
import Gallery from './components/Gallery';
import { notify } from 'utils/notifications';

const Pdp = ({ initialData }) => {
  const [product, updateProduct] = useState(initialData)
  const [imageSelected, updateImageSelected] = useState(0);
  const [skuSelected, updateSku] = useState(null)
  const [colorSelected, updateColor] = useState(null);
  const [sizeSelected, updateSize] = useState(null);
  const [variations, updateVariations] = useState(initialData.variations);
  const [isReadyForBuy, updateIsReady] = useState(false);
  const [quantity, updateQuantity] = useState(1);

  const checkProductData = () => {
    const { colors, sizes } = product.variations;
    /**
     * Validación para:
     * - 1 variación de color y 1 de tamaño
     * - solo 1 variación de color sin tamaño
     * - solo 1 variación de tamaño sin color
     *
     * Asigna sku automaticamente cuando carga el componente
    */
    if(
      (!colors.length && !sizes.length) ||
      (colors.length === 1 && !sizes.length) ||
      (sizes.length === 1 && !colors.length)
    ) {
      updateSku(product.sku);
      updateIsReady(true);

      if(colors.length === 1 && !sizes.length) {
        updateColor(product.relatedSkus[0].variations.color.name);
      }

      if(sizes.length === 1 && !colors.length) {
        updateSize(product.relatedSkus[0].variations.size.name);
      }

      return;
    };
  }

  useEffect(() => checkProductData(), []);

  const updateData = sku => {
    service.productSku(sku)
      .then(response => {
          if(quantity > response.product.quantity) updateQuantity(response.product.quantity);

          response.product.variations.colors.sort((a,b) => (a.name > b.name)
            ? 1 : ((b.name > a.name) ? -1 : 0));

          updateSku(response.product.sku);
          updateProduct(response.product);
        }
      );
  };

  const onChangeQuantity = number => {
    const newQuantity = quantity + number;
    if(newQuantity <= 0) return;
    if(newQuantity > product.quantity) return;

    updateQuantity(quantity + number);
  };

  const onSelectColor = color => {
    return () => {
      const newSizeVariations = []
      const productFiltered = product.relatedSkus
        .filter(element => {
          if(element.variations.color.name === color) {
            newSizeVariations.push({ name: element.variations.size.name })
            return element;
          }
        });

      const sizesFilter = product.relatedSkus
        .filter(element => element.variations.color.name === color)

      /**
       * Si el color seleccionado solo tiene una variacion de talla
       * esta queda seleccionada automaticamente
      */
      if(sizesFilter.length === 1) {
        updateSize(sizesFilter[0].variations.size.name);
        updateIsReady(true);
      } else {
        updateSize(null);
        updateIsReady(false);
      }

      updateColor(color);
      updateData(productFiltered[0].sku);

      updateVariations({
        sizes: newSizeVariations,
        colors: product.variations.colors
      });
    }
  }

  const onSelectSize = size => {
    return () => {
      if(product.variations.colors.length <= 1) {
        const findProduct = product.relatedSkus
          .find(element => element.variations.size.name === size);

        updateSku(findProduct.sku);
        updateColor(findProduct.variations.color.name)
        updateIsReady(true);
        return;
      }

      if(product.variations.sizes.length && product.variations.colors.length) {
        if(!colorSelected) return;

        const findProduct = product.relatedSkus
          .find(element =>
            element.variations.size.name === size &&
            element.variations.color.name === colorSelected
          );

        if(findProduct) {
          updateSku(findProduct.sku)
          updateIsReady(true);
        }
      }

      updateSize(size);
    }
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
    'default-button--disabled': !isReadyForBuy || !skuSelected
  });

  const addEvent = isReadyForBuy ? onAddToCar : () => {};

  const colors = product.variations.colors.length && (
    <div>
      <span className="strong">Color: </span> {colorSelected}
      <Color
        colorList={variations.colors}
        onClick={onSelectColor}
      />
    </div>
  );

  const sizes = product.variations.sizes.length && (
    <div>
      <span className="strong">Talla: </span> {sizeSelected}
      <Size
        sizeSelected={sizeSelected}
        sizeList={variations.sizes}
        onClick={onSelectSize}
      />
    </div>
  );

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

      <div className="pdp-page">
        <div className="pdp">
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
            <div className="pdp__detail__price">$ {thousandFormat(product.price, 0)}</div>
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

            <div>
              <span className="strong">Stock: </span>
              {product.quantity} unidades.
            </div>

            {colors}
            {sizes}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pdp;

import React, { useState } from 'react';
import Item from './components/Item';
import { askForConfirm, notify } from 'utils/notifications';


const Basket = ({ initialProducts }) => {
  const [products, updateProducts] = useState(initialProducts);

  const onRemove = id => () => {
    if (!askForConfirm("Esta seguro de remover este producto?")) return;

    const items = JSON.parse(localStorage.getItem('car'));
    const products = items.filter(product => product.id !== id);
    const serializedObj = JSON.stringify(products.length ? products : []);

    localStorage.setItem('car', serializedObj);

    updateProducts(products);
  };

  const validateSession = () => {
    const uuid = window.sessionStorage.getItem('uuid');

    if (!uuid) {
      notify('Para continuar debes iniciar sesión');
      window.localStorage.setItem('lastUrl', window.location.href);
      window.location.assign('/login');
      return;
    }

    window.location.assign('/checkout');
  };

  const rows = products.map((product, index) =>
    <Item
      data={product}
      onRemove={onRemove(product.id)}
      key={`pod-list-item-${index}`}
    />
  );

  return (
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
          <a href="/carrito">Carrito</a>
        </div>
      </div>

      <table className="basket-table">
        <thead>
          <tr className="row">
            <th className="row__item">Producto</th>
            <th className="row__item">Precio</th>
            <th className="row__item">Cantidad</th>
            {/* <th className="row__item">Total</th> */}
            <th className="row__item"></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>

      {
        products.length && (
          <div className="checkout-button" onClick={validateSession}>
            <div>
              <button className="default-button">Ir a comprar</button>
            </div>
          </div>
        )
      }


    </section>
  )
}

export default Basket;

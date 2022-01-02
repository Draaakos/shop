import React, { Component } from 'react';
import Slider from 'ui/Slider';
import thousandFormat from 'utils/thousandFormat';

const Pod = ({ data }) => {
  const url = data.quantity ? data.url : '/';
  const noStock = (
    <div className="pod__shadow">
      <div className="sticker">SIN STOCK</div>
    </div>
  );

  return (
    <a href={url}>
      <div className="pod">
        { !data.quantity ? noStock : null }
        <div className="pod__header">
          <div className="pod__header__icon">
            <div className="icon icon--steam" />
          </div>
          <img src={data.images[0].url} />
        </div>
        <div className="pod__body">
          <div className="pod__body__name">{data.name}</div>
          {/* <div className="pod__body__quantity">Stock: {data.quantity}</div> */}
          <div className="pod__body__price-before">Antes: {thousandFormat(data.before_price)} CLP</div>
          <div className="pod__body__price">Ahora: {thousandFormat(data.price)} CLP</div>
        </div>
      </div>
    </a>
  )
};

const Home = ({ products }) => (
  <div className="page">
    <div className="page__slider">
      <Slider />
    </div>

    <h3 className="title">Productos disponibles</h3>

    <div className="pod-list">
      { products.map((item, index) => <Pod data={item} key={`pod-${index}`}/>) }
    </div>
  </div>
);

export default Home;

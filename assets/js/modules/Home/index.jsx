import React, { Component } from 'react';
import Slider from 'ui/Slider';

const Pod = ({ data }) => (
  <a href={data.url}>
    <div className="pod">
      <div className="pod__header">
        <img src={data.images[0].url} />
      </div>
      <div className="pod__body">
        <div className="pod__body__name">{data.name}</div>
        <div className="pod__body__quantity">Stock: {data.quantity}</div>
        <div className="pod__body__price-before">Antes: {data.before_price} CLP</div>
        <div className="pod__body__price">Ahora: {data.price} CLP</div>
      </div>
    </div>
  </a>
);


const Home = ({ products }) => (
  <div className="page">
    <div className="page__slider">
      <Slider />
    </div>

    <h3 className="title">Productos disponibles</h3>

    <div className="pod-list">
      <Pod data={products[0]} />
      <Pod data={products[0]} />
      <Pod data={products[0]} />
      <Pod data={products[0]} />
      <Pod data={products[0]} />
      <Pod data={products[0]} />
      <Pod data={products[0]} />
    </div>
  </div>
);

export default Home;

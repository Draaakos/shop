import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../modules/Home';

const products = window.serializedContent.productList.products;
const sliderItemList = window.serializedContent.slider;

ReactDOM.render(
  <Home products={products} sliderItemList={sliderItemList} />,
  document.querySelector('#app')
);

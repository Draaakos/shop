import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../modules/Home';

const products = window.serializedContent.products;

ReactDOM.render(
  <Home products={products} />,
  document.querySelector('#app')
);

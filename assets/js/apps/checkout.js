import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../modules/Checkout';

const products = JSON.parse(window.localStorage.getItem('car'));

ReactDOM.render(
  React.createElement(Component, { products }),
  document.querySelector('#app')
);

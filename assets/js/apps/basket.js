import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../modules/Basket';

const initialProducts = JSON.parse(window.localStorage.getItem('car'));

ReactDOM.render(
  React.createElement(Component, { initialProducts }),
  document.querySelector('#app')
);

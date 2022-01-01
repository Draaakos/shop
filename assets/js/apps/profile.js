import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../modules/Profile';

ReactDOM.render(
  React.createElement(Component, { initialData: window.serializedContent }),
  document.querySelector('#app')
);

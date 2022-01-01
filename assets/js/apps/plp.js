import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../modules/Plp';

ReactDOM.render(
  React.createElement(Component, { ...window.serializedContent }),
  document.querySelector('#app')
);

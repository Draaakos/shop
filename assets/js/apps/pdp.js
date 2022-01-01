import React from 'react';
import ReactDOM from 'react-dom';
import Component from '../modules/Pdp';

const initialData = window.serializedContent;
initialData.variations.colors.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

ReactDOM.render(
  React.createElement(Component, { initialData }),
  document.querySelector('#app')
);

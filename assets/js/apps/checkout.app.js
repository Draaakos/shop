import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../modules/Checkout/index.jsx';

// const products = JSON.parse(window.localStorage.getItem('car'));

const root = createRoot(document.querySelector('#app'));
root.render(createElement(App));

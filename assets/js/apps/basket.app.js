import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../modules/Basket/index.jsx';

// const initialProducts = JSON.parse(window.localStorage.getItem('car'));

const root = createRoot(document.querySelector('#app'));
root.render(createElement(App));

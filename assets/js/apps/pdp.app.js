// const initialData = window.serializedContent;
// initialData.variations.colors.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../modules/PDP/index.jsx';

// const initialProducts = JSON.parse(window.localStorage.getItem('car'));

const root = createRoot(document.querySelector('#app'));
root.render(createElement(App));

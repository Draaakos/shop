// React.createElement(Component, { ...window.serializedContent }),

import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../modules/PLP/index.jsx';

// const initialProducts = JSON.parse(window.localStorage.getItem('car'));

const root = createRoot(document.querySelector('#app'));
root.render(createElement(App));

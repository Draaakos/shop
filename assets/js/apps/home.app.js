import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../modules/Home/index.jsx';

const root = createRoot(document.querySelector('#app'));
root.render(createElement(App));
